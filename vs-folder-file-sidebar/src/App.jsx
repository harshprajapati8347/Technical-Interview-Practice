import { useState } from "react";
import Folder from "./components/Folder";
import explorer from "./data/folderData";
import useTraverseTree from "./hooks/useTraverseTree";

function App() {
  const [folderData, setFolderData] = useState(explorer);
  const { insertNode, deleteNode, renameNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(folderData, folderId, item, isFolder);
    setFolderData(finalTree);
  };

  const handleDeleteNode = (folderId, isFolder) => {
    const finalTree = deleteNode(folderData, folderId, isFolder);
    setFolderData(finalTree);
  };

  const handleRenameNode = (folderId, item, isFolder) => {
    const finalTree = renameNode(folderData, folderId, item, isFolder);
    setFolderData(finalTree);
  };
  return (
    <div>
      <Folder
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
        folderData={folderData}
      />
    </div>
  );
}

export default App;
