import React from "react";
import { ReactComponent as MapImage } from "./../us.svg";

// Background map to display objects on
export function Map() {
    return (
      <div>
          <MapImage />
      </div>
    );
  }


export const MemoizedMap = React.memo(Map);

export default MemoizedMap;