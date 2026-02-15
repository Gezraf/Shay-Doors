<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Cloudinary credentials
$cloudName = "dkgx2zv2g";
$apiKey = "225137542615174";
$apiSecret = "JUGquiCJOjEmYcFYLYi2f7R6n2E";

// Folder structure mapping
$folders = [
    "doors/line-zero/aluminum" => "line-zero-aluminum",
    "doors/line-zero/porcelain" => "line-zero-porcelain", 
    "doors/line-zero/glass" => "line-zero-glass",
    "doors/entrance/modern" => "entrance-modern",
    "doors/entrance/provence" => "entrance-provence",
    "doors/synagogue" => "synagogue",
    "front-views" => "front-views",
    "special" => "special"
];

$allImages = [];

foreach ($folders as $folderPath => $category) {
    $url = "https://api.cloudinary.com/v1_1/$cloudName/resources/image?prefix=" . urlencode($folderPath) . "&max_results=500";
    
    $auth = base64_encode("$apiKey:$apiSecret");
    
    $context = stream_context_create([
        "http" => [
            "header" => "Authorization: Basic $auth\r\n",
            "method" => "GET"
        ]
    ]);
    
    $response = file_get_contents($url, false, $context);
    
    if ($response !== false) {
        $data = json_decode($response, true);
        
        if (isset($data["resources"])) {
            foreach ($data["resources"] as $index => $resource) {
                $allImages[] = [
                    "id" => "$category-$index",
                    "category" => $category,
                    "displayName" => getCategoryDisplayName($category),
                    "thumbnailUrl" => "https://res.cloudinary.com/dkgx2zv2g/image/upload/w_400,h_300,c_fill,f_auto,q_auto/" . $resource["public_id"],
                    "fullImageUrl" => "https://res.cloudinary.com/dkgx2zv2g/image/upload/w_1200,h_800,c_fill,f_auto,q_auto/" . $resource["public_id"],
                    "alt" => getCategoryDisplayName($category) . " - תמונה " . ($index + 1),
                    "originalName" => $resource["public_id"],
                    "folder" => $folderPath,
                    "discoveryMethod" => "php-proxy"
                ];
            }
        }
    }
    
    usleep(200000); // 200ms delay
}

function getCategoryDisplayName($category) {
    $names = [
        "line-zero-aluminum" => "דלתות קו-אפס - אלומיניום",
        "line-zero-porcelain" => "דלתות קו-אפס - פורצלן", 
        "line-zero-glass" => "דלתות קו-אפס - זכוכית",
        "entrance-modern" => "דלתות כניסה מודרניות",
        "entrance-provence" => "דלתות כניסה פרובנס",
        "synagogue" => "דלתות לבתי כנסת",
        "front-views" => "מבטי חזית",
        "special" => "עבודות מיוחדות"
    ];
    return $names[$category] ?? $category;
}

echo json_encode([
    "success" => true,
    "total" => count($allImages),
    "images" => $allImages
]);
?>