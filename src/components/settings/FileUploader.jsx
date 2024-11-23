import { useFileUploadContext } from "../../context/FileUploadContext.jsx";
import classNames from "../../utils/classNames.js";
import LoadingIcon from "../../assets/LoadingIcon.jsx";
import {useRoomMappingFormContext} from "../../context/RoomMappingFormContext.jsx";

const FileUploader = () => {
    const styles = {
        fileList: "divide-y divide-gray-100 rounded-md border border-gray-200 bg-gray-50",
        fileListItem: "flex items-center justify-between py-4 pl-4 pr-5 text-sm/6",
        fileListItemContent: "flex w-0 flex-1 items-center",
        fileIcon: "size-5 shrink-0 text-gray-400",
        fileDetails: "ml-4 flex min-w-0 flex-1 gap-2",
        fileName: "truncate font-medium",
        fileSize: "shrink-0 text-gray-400",
        fileActions: "ml-4 shrink-0",
        link: "font-medium text-indigo-600 hover:text-indigo-500",
    };

    const {
        file,
        status,
        handleFileChange,
        handleFileUpload,
    } = useFileUploadContext();

    const {imageUrl} = useRoomMappingFormContext()

    return (
        <ul role="list" className={styles.fileList}>
            <li className={styles.fileListItem}>
                <div className={styles.fileListItemContent}>
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

                    <span className={styles.fileDetails}>
                        <span className={styles.fileName}>{file?.name || "No picture selected"}</span>
                    </span>

                    <div className={classNames(styles.fileActions, "flex gap-3")}>
                        <div>
                            <input
                                type="file"
                                id="upload"
                                accept=".jpg, .jpeg, .png"
                                onChange={handleFileChange}
                                onClick={handleFileUpload}
                                hidden
                            />
                            <label htmlFor="upload" className={classNames(styles.link, "cursor-pointer")}>
                                Replace
                            </label>
                        </div>
                        <a
                            className={styles.link}
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
