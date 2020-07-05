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
import React, { useEffect, useRef } from "react";
import Button from "./Button";
import { PointI } from "../interfaces";

import ContentEditable from "react-contenteditable";
import styled from "styled-components";

//TODO: correct props below
const Point = (props: {
  point: PointI;
  messageDispatch: any;
  isEditing: boolean;
  setEditingPoint: any;
  createEmptyPoint?: any;
  onClick: any;
}) => {
  const {
    point,
    messageDispatch,
    isEditing,
    setEditingPoint,
    createEmptyPoint,
    onClick,
  } = props;

  const innerRef = useRef<HTMLDivElement>(null);
  const text = useRef(point.content);

  const handleChange = (e: any) => {
    text.current = e.target.value;
  };

  const handleBlur = () => {
    messageDispatch({
      type: "pointUpdate",
      point: { ...point, content: text.current },
    });
    setEditingPoint("");
  };

  useEffect(() => {
    isEditing && innerRef.current && innerRef.current.focus();
  }, [isEditing]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    onClick();
  };
  const handleDelete = () => {
    messageDispatch({
      type: "pointsDelete",
      pointIds: [point.pointId],
    });
  };

  const imageUrl = require(`../images/${point.shape}.svg`);

  return (
    <StyledSpan onClick={handleClick}>
      <StyledImg src={imageUrl} alt={point.shape} />
      <StyledContentEditable
        html={text.current}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={() => setEditingPoint(point.pointId)}
        innerRef={innerRef}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            e.preventDefault();
            createEmptyPoint();
          }
        }}
      />
      <Button type="button" onClick={handleDelete} />
    </StyledSpan>
  );
};

const StyledImg = styled.img`
  height: 20px;
  margin: 3px 4px 0 3px;
  opacity: 0.7;
`;

const StyledSpan = styled.span`
  display: flex;
`;

const StyledContentEditable = styled(ContentEditable)`
  width: 100%;
  padding-top: 4px;
  outline: 0;
  overflow: auto;
`;

export default Point;
