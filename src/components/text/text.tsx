import React, { FC } from 'react';
import { textWrapper } from './text.styled';

interface textProps {}

const text: FC<textProps> = () => (
 <textWrapper data-testid="text">
    text Component
 </textWrapper>
);

export default text;
