<?php

/**
 * Table control.
 *
 * @package   Block_Lab
 * @copyright Copyright(c) 2020, Block Lab
 * @license http://opensource.org/licenses/GPL-2.0 GNU General Public License, version 2 (GPL-2.0)
 */

namespace Block_Lab\Blocks\Controls;

/**
 * Class Table
 */
class Table extends Control_Abstract
{

    /**
     * Control name.
     *
     * @var string
     */
    public $name = 'table';

    /**
     * Field variable type.
     *
     * The Table control is an array of objects, with each row being an object.
     * For example, a table with one row might be [ { 'example-text': 'Foo', 'example-image': 4232 } ].
     *
     * @var string
     */
    public $type = 'object';

    /**
     * Table constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->label = __('Table', 'block-lab');
    }

    /**
     * Register settings.
     *
     * @return void
     */
    public function register_settings()
    {
        $this->settings[] = new Control_Setting(
            [
                'name'     => 'data',
                'label'    => __('Data (hidden)', 'block-lab'),
                'type'     => 'text',
            ]
        );
    }

    /**
     * Remove empty placeholder rows.
     *
     * @param mixed $value The value to either make available as a variable or echoed on the front-end template.
     * @param bool  $echo Whether this will be echoed.
     * @return mixed $value The value to be made available or echoed on the front-end template.
     */
    public function validate($value, $echo)
    {
        if (isset($value['rows'])) {
            foreach ($value['rows'] as $key => $row) {
                unset($value['rows'][$key]['']);
                unset($value['rows'][$key][0]);
            }
        }

        if ($echo && defined('WP_DEBUG') && WP_DEBUG) {
            $value = sprintf(
                // translators: Placeholders are the opening and closing anchor tags of a link.
                __('⚠️ Please use Block Lab\'s %1$srepeater functions%2$s to display repeater fields in your template.', 'block-lab'),
                '<a href="https://getblocklab.com/docs/fields/repeater/">',
                '</a>'
            );
        }

        return $value;
    }
}
