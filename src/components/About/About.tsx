import React, { FC } from 'react';
import { AboutWrapper } from './About.styled';

interface AboutProps {}

const About: FC<AboutProps> = () => (
 <AboutWrapper data-testid="About">
    About Component
 </AboutWrapper>
);

export default About;
