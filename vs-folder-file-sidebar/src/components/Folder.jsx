import PropTypes from "prop-types";
import { useState } from "react";
import "./Folder.css";

const Folder = ({
  folderData,
  handleInsertNode,
  handleDeleteNode,
  handleRenameNode,
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
    rename: false,
  });

  const handleNewFolder = (e) => {
    e.stopPropagation();
    setShowInput({ visible: true, isFolder: true, rename: false });
  };

  const handleNewFile = (e) => {
    e.stopPropagation();
    setShowInput({ visible: true, isFolder: false, rename: false });
  };

  const handleRename = (e) => {
    e.stopPropagation();
    setShowInput({ ...showInput, visible: false, rename: true });
  };

  const onRenameFolder = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleRenameNode(folderData.id, e.target.value, folderData.isFolder);
      setShowInput({ ...showInput, rename: false });
    }
  };

  const onAddFolder = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleInsertNode(folderData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  return (
    <div className="folder-container">
      <div className="folder" onClick={() => setExpand(!expand)}>
        <span className="folder-title">
          {folderData.isFolder && (
            <button className="expand">{expand ? "▼" : "▶"}</button>
          )}
          {folderData.isFolder ? "📂" : "📄"} {folderData.name}
        </span>
        <div className="folder-actions">
          <button className="rename" onClick={handleRename}>
            ✏️
          </button>
          <button
            className="delete"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNode(folderData.id, folderData.isFolder);
            }}
          >
            ❌
          </button>
          {folderData.isFolder && (
            <>
              <button className="create-folder" onClick={handleNewFolder}>
                + Folder
              </button>
              <button className="create-file" onClick={handleNewFile}>
                + File
              </button>
            </>
          )}
        </div>
      </div>

      {showInput.visible && (
        <div className="inputContainer">
          <span>{showInput.isFolder ? "📂" : "📄"}</span>
          <input
            type="text"
            className="input"
            autoFocus
            onKeyDown={onAddFolder}
            onBlur={() => setShowInput({ ...showInput, visible: false })}
          />
        </div>
      )}

      {showInput.rename && (
        <div className="inputContainer">
          <span>✏️</span>
          <input
            type="text"
            className="input"
            autoFocus
            onKeyDown={onRenameFolder}
            onBlur={() => setShowInput({ ...showInput, rename: false })}
          />
        </div>
      )}

      {folderData.isFolder && expand && (
        <div className="folder-content">
          {folderData.items.map((item) => (
            <Folder
              key={item.id}
              folderData={item}
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              handleRenameNode={handleRenameNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Folder.propTypes = {
  folderData: PropTypes.object.isRequired,
  handleInsertNode: PropTypes.func.isRequired,
  handleDeleteNode: PropTypes.func.isRequired,
  handleRenameNode: PropTypes.func.isRequired,
};

export default Folder;
