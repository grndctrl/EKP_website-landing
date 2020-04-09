<?php
/**
 * Template Name: Page
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context = Timber::context();
$timber_post = new Timber\Post();
$context['post'] = $timber_post;

$templates = array( 'pages/_' . $timber_post->post_name . '.twig', 'pages/_page.twig' );

Timber::render($templates, $context);