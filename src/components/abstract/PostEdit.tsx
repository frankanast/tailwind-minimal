import { Component, createRef } from "react";
import TemplateDesigner from "./TemplateDesigner";

// PostEdit for TemplateDesigner

interface Props {}

interface State {
    content: string;
}

class PostEdit extends Component<Props, State> {
    editorRef: any = createRef();

    constructor(props: Props) {
        super(props);
        this.state = {
            content: "Test",
        };
    }

    save() {
        const contents = this.editorRef.current.editor.getContents();
        console.log("save", contents);
    }

    render() {
        return (
            <div>
                <TemplateDesigner ref={this.editorRef} contents={this.state.content} onSave={this.save.bind(this)}></TemplateDesigner>

                <button onClick={() => this.save()}>
                    <span>Save</span>
                </button>
            </div>
        );
    }
}

export default PostEdit;
