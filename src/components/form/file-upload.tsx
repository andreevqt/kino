import React, { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import Text from '../text/text';
import DropZone from './drop-zone';

type TFileProps = {
  label: string;
  value?: File;
  src?: string;
  onChange: (file?: File) => void;
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

const Preview = styled.img`
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
  label,
  src,
  value,
  onChange
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = (file: File) => {
    onChange(file);
  };

  const hasImage = !!(value || src);

  return (
    <DndProvider backend={HTML5Backend}>
      <Text variant="h5">{label}</Text>
      <input
        type="file"
        hidden
        accept="image/jpeg,image/png"
        onChange={(e) => onChange(e.target.files?.[0])}
        ref={inputRef}
      />
      <FileWrapper onClick={() => {
        if (inputRef.current) {
          inputRef.current.click();
        }
      }}>
        {hasImage && <Preview src={value ? URL.createObjectURL(value) : src} />}
        <DropZone isEmpty={!hasImage} onDrop={onDrop} />
      </FileWrapper>
    </DndProvider>
  );
};

export default FileUpload;
