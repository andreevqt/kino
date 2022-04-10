import React, { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import Text from '../text/text';
import DropZone from './drop-zone';

type TFileProps = {
  label: string;
};

const FileWrapper = styled.div`
  cursor: pointer;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 100%;
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FileUpload: React.FC<TFileProps> = ({
  label
}) => {
  const [file, setFile] = useState<any>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = (file: any) => {
    setFile(file);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Text variant="h5">{label}</Text>
      <input
        type="file"
        hidden
        accept="image/jpeg,image/png"
        onChange={(e) => setFile(e.target.files?.[0])}
        ref={inputRef}
      />
      <FileWrapper onClick={() => {
        if (inputRef.current) {
          inputRef.current.click();
        }
      }}>
        {file && <Img src={URL.createObjectURL(file)} />}
        <DropZone isEmpty={!file} onDrop={onDrop} />
      </FileWrapper>
    </DndProvider>
  );
};


export default FileUpload;
