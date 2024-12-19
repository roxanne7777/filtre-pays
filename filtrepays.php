<?php
/*
plugin name: Filtre Pays
author: Roxanne Auclair
description: Une extension qui permettra de filtrer nos articles
*/ 

function charger_scripts_css(){
 
    $version_css = filemtime(plugin_dir_path(__FILE__) . "/style.css");
    $version_js = filemtime(plugin_dir_path(__FILE__) . "/js/filtrepays.js");
 
    wp_enqueue_style(
        "filtrepays",        
        plugin_dir_url(__FILE__) . "/style.css",
        array(),
        $version_css
    );  
 
    wp_enqueue_script(
        "filtrepays",      
        plugin_dir_url(__FILE__) . "/js/filtrepays.js",
        array(),
        $version_js,
        true
    );
}

add_action('wp_enqueue_scripts', 'charger_scripts_css');

function genere_boutons() {
    $pays = ["France","États-Unis", "Canada", "Argentine", "Chili", "Belgique", "Maroc", "Mexique", "Japon", "Italie", "Islande", "Chine", "Grèce", "Suisse"];
    $contenu = ''; 
    foreach($pays as $index => $nom) {
        $contenu .= "<button data-id='$index'>$nom</button>";
    }
    return "<div class='filtre__bouton'>$contenu</div>";
}
add_shortcode('extraire_pays', 'genere_boutons');

?>