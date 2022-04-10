import React from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import Text from '../text/text';
import Cloud from '../../icons/cloud';
import { alpha } from '../../theme/utils';

const StyledDropzone = styled.div`
  ${({ theme }) => `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px dashed ${theme.colors.primary.base};
    color: ${theme.colors.primary.base};
    background-color: ${alpha(theme.colors.background.base, .6)};
    border-radius: 3px;
  `}
`;

const DropzoneLabel = styled(Text).attrs(() => ({ variant: 'display4' }))`
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 0;
`;

type TDropzoneProps = {
  isEmpty?: boolean,
  accept?: string[],
  onDrop?: (item: any) => void
};

type TFile = {
  files: any[]
};

const Dropzone: React.FC<TDropzoneProps> = ({
  isEmpty = true,
  onDrop,
  accept = ['image/jpeg']
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    canDrop: ({ files }: TFile, monitor) => {
      if (!files.length) {
        return true;
      }

      return files.every((file) => accept.includes(file.type));
    },
    drop: (item: TFile) => {
      if (onDrop) {
        onDrop(item.files[0]);
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    })
  }));
  return (
    <>
      {
        (isEmpty || canDrop) && (
          <StyledDropzone ref={drop}>
            <Cloud />
            <DropzoneLabel>поддерживаемые форматы jpeg, png</DropzoneLabel>
          </StyledDropzone>
        )
      }
    </>
  );
};

export default Dropzone;
