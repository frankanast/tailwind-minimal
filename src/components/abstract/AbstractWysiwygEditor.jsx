import {Component} from 'react'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {SketchPicker} from 'react-color';
import PropTypes from "prop-types";

/*
This component is directly taken from the react-draft-wysiwyg documentation, with adaptations.
For this reason, it uses classes and other constructs compared to the rest of the codebase.
For now, we will keep these inconsistencies due to the lack of complete documentation.
In future, it is advisable to opt for a better supported library or review the whole approach.
*/

class ColorPic extends Component {
    static propTypes = {
        expanded: PropTypes.bool,
        onExpandEvent: PropTypes.func,
        onChange: PropTypes.func,
        currentState: PropTypes.object,
    };

    stopPropagation = (event) => {
        event.stopPropagation();
    };

    onChange = (color) => {
        const { onChange } = this.props;
        onChange('color', color.hex);
    }

    renderModal = () => {
        const { color } = this.props.currentState;
        return (
            <div
                onClick={this.stopPropagation}
                className="rdw-colorpicker-modal"
            >
                <SketchPicker color={color} onChangeComplete={this.onChange} />
            </div>
        );
    };

    render() {
        const { expanded, onExpandEvent } = this.props;
        return (
            <div
                aria-haspopup="true"
                aria-expanded={expanded}
                className="rdw-colorpicker-wrapper rdw-color-picker"
            >
                <div
                    onClick={onExpandEvent}
                >
                    <img
                        src="/src/assets/icons/paint_bucket.png"
                        style={{ width: 22, height: 22, paddingTop: 0 }}
                        alt=""
                    />
                </div>
                {expanded ? this.renderModal() : undefined}
            </div>
        );
    }
}


export default class AbstractWysiwygEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createWithText("Hello, world..."),
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
                // wrapperStyle={{ }}
                editorStyle={{ padding: "1rem 2rem", }}
                toolbarStyle={{ backgroundColor: "#f8fafc", borderStyle: "none" }}
                toolbar={{
                    options: ['inline', 'colorPicker', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'embedded', 'image', 'remove', 'history'],
                    colorPicker: { component: ColorPic },
                }}
            />
        )
    }
}
