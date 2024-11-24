import { useFileUploadContext } from "../../context/FileUploadContext.jsx";
import classNames from "../../utils/classNames.js";
import LoadingIcon from "../../assets/LoadingIcon.jsx";
import {useRoomMappingContext} from "../../context/RoomMappingFormContext.jsx";
import mappingFormStyles from "./mappingFormStyles.js";

const FileUploader = () => {
    const {
        file,
        status,
        handleFileChange,
        handleFileUpload,
    } = useFileUploadContext();

    const {imageUrl} = useRoomMappingContext()

    return (
        <ul role="list" className={mappingFormStyles.fileList}>
            <li className={mappingFormStyles.fileListItem}>
                <div className={mappingFormStyles.fileListItemContent}>
                    <span>
                        {(status === "uploading") ? (
                            <div className="inline-block size-12 rounded-md">
                                <LoadingIcon className="w-7 h-auto text-gray-400" />
                            </div>
                        ) : (
                            <>
                                <label className="hidden sr-only">Image preview</label>
                                <div
                                    className="w-12 h-12 rounded-md"
                                    style={{
                                        backgroundImage: imageUrl ? `url(${imageUrl})` : "url(https://programmino-be.onrender.com/download_pic/1c5e9959-d53f-4c19-9117-9ffb64dcb899.png)",
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                />
                            </>

                        )}
                    </span>

                    <span className={mappingFormStyles.fileDetails}>
                        <span className={mappingFormStyles.fileName}>{file?.name || "No picture selected"}</span>
                    </span>

                    <div className={classNames(mappingFormStyles.fileActions, "flex gap-3")}>
                        <div>
                            <input
                                type="file"
                                id="upload"
                                accept=".jpg, .jpeg, .png"
                                onChange={handleFileChange}
                                onClick={handleFileUpload}
                                hidden
                            />
                            <label htmlFor="upload" className={classNames(mappingFormStyles.link, "cursor-pointer")}>
                                Replace
                            </label>
                        </div>
                        <a
                            className={mappingFormStyles.link}
                            href={imageUrl || "https://programmino-be.onrender.com/download_pic/1c5e9959-d53f-4c19-9117-9ffb64dcb899.png"}
                            target="_blank"
                        >
                            View
                        </a>
                    </div>
                </div>
            </li>
        </ul>
    );
};

export default FileUploader;
