/* global blockLab, blockLabBlocks */

/**
 * WordPress dependencies
 */
import { setLocaleData } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { registerBlocks } from './helpers';
import { Edit } from './components';
import '../../css/src/editor.scss';

setLocaleData( { '': {} }, 'block-lab' );
registerBlocks( blockLab, blockLabBlocks, Edit );
