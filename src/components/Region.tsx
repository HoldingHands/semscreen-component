/*
  Copyright (C) 2020 by USHIN, Inc.

  This file is part of U4U.

  U4U is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  U4U is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with U4U.  If not, see <https://www.gnu.org/licenses/>.
*/
import React from 'react'; 
import Point from './Point';
import styled from 'styled-components';

// TODO: correct types below
const Region = (props: {region: string, styles: { backgroundColor: string; textColor: string; }, points: any, onPointChange: any, onRegionClick: any }) => {
const { region, points, styles, onPointChange, onRegionClick } = props; 

 //TODO: add author to initialstate, interfaces, and below
  return (
   <StyledRegion backgroundColor={styles.backgroundColor} onClick={() => onRegionClick(region, false)}>
  <ul className="list-unstyled">
   {points.map((p : any) => <Point content={ p.content } shape={p.shape} id={p.id} onPointChange={onPointChange} onPointClick={() => onRegionClick(region, true)} />)}
  </ul>
 </StyledRegion>
 )
}

interface StyledRegionProps {
  backgroundColor: string;
}

const StyledRegion = styled.div<StyledRegionProps>`
  width: 100%;
  height: 100%;
  background-color: ${props => props.backgroundColor};
  overflow: auto;
`
export default Region;

