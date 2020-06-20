/*
  Copyright (C) 2019 by USHIN, Inc.

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
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import SemanticScreen from "./components/SemanticScreen";
import { messages } from "./constants/initialState";
import { AuthorI, PointI } from "./interfaces";

const App = () => {
  const messageInitialState = messages[0];
  const showShapes = true;

  const [author, setAuthor] = useState<AuthorI>(messageInitialState.author);
  const [points, setPoints] = useState<PointI[]>(messageInitialState.points);

  const handlePointCreate = (newPoint: PointI) => {
    const p = {
      ...newPoint,
      pointId: uuidv4(),
      pointDate: new Date(),
    };
    setPoints((points) => [...points, p]);
  };

  const handlePointUpdate = (updatedPoint: PointI) => {
    let updatedPoints = points.map((p) => {
      if (p.pointId === updatedPoint.pointId) {
        return updatedPoint;
      }
      return p;
    });
    setPoints(updatedPoints);
  };

  const handlePointDelete = (pointId: string) => {
    let updatedPoints = points.filter((p) => p.pointId !== pointId);
    setPoints(updatedPoints);
  };

  return (
    <SemanticScreen
      author={author}
      points={points}
      showShapes={showShapes}
      onAuthorUpdate={console.log}
      onPointCreate={handlePointCreate}
      onPointUpdate={handlePointUpdate}
      onPointDelete={handlePointDelete}
    />
  );
};

export default App;
