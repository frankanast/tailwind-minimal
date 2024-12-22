import 'react'
import { ReactSummernoteLite } from '@easylogic/react-summernote-lite';

const AbstractWysiwygEditor = () => {
    return (
        <ReactSummernoteLite
            id="lite"
            initInvoke={(invoke) => {
                invoke('pasteHTML', '<span style="font-size:11pt">Get started by editing your template...</span>');
            }}
        />
    );
};

export default AbstractWysiwygEditor;