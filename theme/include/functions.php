<?php

require_once __DIR__.'/vendor/autoload.php';

$timber = new Timber\Timber();
$timmy = new Timmy\Timmy();

if (!class_exists('Timber')) {
    add_action('admin_notices', function () {
        echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="'.esc_url(admin_url('plugins.php#timber')).'">'.esc_url(admin_url('plugins.php')).'</a></p></div>';
    });
    add_filter('template_include', function ($template) {
        return '<h1>No Timber</h1>';
    });

    return;
}
/*
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array('templates', 'views');
/*
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;
/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php").
 */
class EkpLanding extends Timber\Site
{
    /** Add timber support. */
    public function __construct()
    {
        add_action('after_setup_theme', array($this, 'theme_supports'));
        add_filter('timber_context', array($this, 'add_to_context'));
        add_filter('timmy/sizes', array($this, 'timmy_sizes'));
        add_action('init', array($this, 'register_post_types'));
        add_action('init', array($this, 'register_advanced_custom_fields'));
        add_action('init', array($this, 'register_taxonomies'));
        add_action('admin_enqueue_scripts', array( $this, 'load_admin_scripts' ));
        add_action('wp_enqueue_scripts', array( $this, 'load_scripts' ));
        add_filter('get_twig', array($this, 'add_to_twig'));
        add_filter('acf/fields/google_map/api', array($this, 'my_acf_google_map_api'));
        parent::__construct();
    }

    public function my_acf_google_map_api( $api ){
        $api['key'] = 'AIzaSyD945Kmvxqy0zQCjf6MDIXQ0-TLM-LFZ2I';
        return $api;
    }

    public function theme_supports()
    {
        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');
        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support('title-tag');
        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');
        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support(
            'html5',
            array(
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
            )
        );
        /*
         * Enable support for Post Formats.
         *
         * See: https://codex.wordpress.org/Post_Formats
         */
        add_theme_support(
            'post-formats',
            array(
                'aside',
                'image',
                'video',
                'quote',
                'link',
                'gallery',
                'audio',
            )
        );
        add_theme_support('menus');
    }

    /** This is where you add some context
     *
     * @param string $context context['this'] Being the Twig's {{ this }}
     */
    public function add_to_context($context)
    {
        $context['menu'] = new Timber\Menu();
        $context['site'] = $this;

        $args = array(
            'post_type' => 'global'
        );
        $globals = Timber::get_posts($args);
        $context['globals'] = $globals;

        $args = array(
            'post_type' => 'page',
            'name' => 'plan'
        );
        $context['plan'] = Timber::get_post($args);

        return $context;
    }

    public function timmy_sizes($sizes)
    {
        return array(
            'thumbnail' => array(
                'resize' => array(200, 200),
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'lazy-landscape' => array(
                'resize' => array(800, 533),
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'lazy-portrait' => array(
                'resize' => array(533, 800),
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'lazy' => array(
                'resize' => array(800),
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'portrait' => array(
                'resize' => array(1250, 1875),
                'srcset' => array(0.5),
                'sizes' => '(min-width: 640px) 50vw, 100vw',
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'landscape' => array(
                'resize' => array(2500, 1666),
                'srcset' => array(0.5),
                'sizes' => '100vw',
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'portrait-loose' => array(
                'resize' => array(1250),
                'srcset' => array(0.5),
                'sizes' => '(min-width: 640px) 50vw, 100vw',
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'landscape-loose' => array(
                'resize' => array(2500),
                'srcset' => array(0.5),
                'sizes' => '100vw',
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'square' => array(
                'resize' => array(2500, 2500),
                'srcset' => array(0.5),
                'sizes' => '100vw',
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
        );
    }

    /** This is where you can register custom post types. */
    public function register_post_types()
    {
        require get_template_directory() . '/import/post-types.php';
    }

    public function register_advanced_custom_fields()
    {
        require get_template_directory() . '/import/advanced-custom-fields.php';
    }

    /** This is where you can register custom taxonomies. */
    public function register_taxonomies()
    {
    }

    public function load_scripts()
    {
        $manifest = file_get_contents(__DIR__ . '/manifest.json');
        $json = json_decode($manifest,true);
        
        $mainJs = $json["main.js"];
        $mainCss = $json["main.css"];
        $fontsJs = $json["fonts.js"];
        $fontsCss = $json["fonts.css"];
        $headJs = $json["head.js"];
       
        wp_enqueue_style('main', $mainCss);
        wp_enqueue_style('fonts', $fontsCss);
        wp_enqueue_script('main', $mainJs, array(), time(), true);
        wp_enqueue_script('fonts', $fontsJs, array(), time(), false);
        wp_enqueue_script('head', $headJs, array(), time(), false);
    }

    public function load_admin_scripts()
    {
        wp_enqueue_style('admin', get_template_directory_uri() .'/css/admin.css', array(), false, 'all');
    }

    /** This is where you can add your own functions to twig.
     *
     * @param string $twig get extension
     */
    public function add_to_twig($twig)
    {
        $twig->addExtension(new Twig_Extension_StringLoader());
        $twig->addFilter(new Twig_SimpleFilter('my_filter', array($this, 'my_filter')));

        return $twig;
    }

    /** This Would return 'foo bar!'.
     *
     * @param string $text being 'foo', then returned 'foo bar!'
     */
    public function my_filter($text)
    {
        $text .= ' bar!';

        return $text;
    }
}
new EkpLanding();
