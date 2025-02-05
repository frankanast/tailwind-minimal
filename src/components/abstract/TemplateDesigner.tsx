import { useEffect, useRef, useState } from "react";
import suneditor from "suneditor";
import { en } from "suneditor/src/lang";
import plugins from "suneditor/src/plugins";
import "suneditor/dist/css/suneditor.min.css";
// @ts-ignore
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "../../assets/styles/TemplateDesigner.scss";
import { useTemplateContext } from "../../context/TemplatesContext";

const TemplateDesigner = ({ contents, onBlur }) => {
    // Call the hook at the top level of the component
    const {
        updateTemplateData,
        isCurrentlyEditingTemplate,
        updateVersionContent,
        mode,
        language,
    } = useTemplateContext();

    const txtArea = useRef(null);
    const [loading, setLoading] = useState(true);
    const editorRef = useRef(null);

    useEffect(() => {
        if (txtArea.current) {
            setTimeout(() => {
                editorRef.current = suneditor.create(txtArea.current, {
                    plugins: plugins,
                    lang: en,
                    callBackSave: handleSave, // Pass the callback here
                    codeMirror: CodeMirror,
                    stickyToolbar: 0,
                    width: "100%",
                    height: "100%",
                    minHeight: "400px",
                    value: contents,
                    imageMultipleFile: true,
                    previewTemplate: `
            <div style="width:auto; max-width:1136px; min-height:400px; margin:auto;">
              {{contents}}
            </div>
          `,
                    buttonList: [
                        ["undo", "redo"],
                        ["font", "fontSize", "formatBlock"],
                        ["bold", "underline", "italic", "strike"],
                        ["fontColor", "hiliteColor", "textStyle"],
                        ["removeFormat"],
                        ["align", "horizontalRule", "list", "lineHeight"],
                        ["table", "link", "image", "video"],
                        ["fullScreen", "showBlocks", "codeView"],
                        ["preview"],
                        ["save"],
                    ],
                });

                editorRef.current.onBlur = () => {
                    if (typeof onBlur === "function") onBlur();
                };

                setLoading(false);
            }, 1000); // Simulated loading delay
        }

        return () => {
            if (editorRef.current) editorRef.current.destroy();
        };
    }, [contents]);

    const handleSave = async (contents) => {
        try {
            await fetch("https://programmino-be.onrender.com/upload_version", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_: isCurrentlyEditingTemplate,
                    mode,
                    lang: language,
                    content: contents, // Sending HTML content as JSON
                }),
            });

            alert("Template updated successfully!");
        } catch (error) {
            console.error("Error updating template version:", error);
            alert("Error updating template version.");
        }
    };

    return (
        <div className="h-full w-full relative">
            {loading && (
                <div className="loading-overlay">
                    <span className="loading-spinner">Loading...</span>
                </div>
            )}
            <textarea ref={txtArea} />
        </div>
    );
};

export default TemplateDesigner;
