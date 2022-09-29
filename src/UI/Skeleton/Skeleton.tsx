import React, { FC } from "react";
import ContentLoader from "react-content-loader";

type SkeletonProps = {
  key?: number;
};

const Skeleton: FC<SkeletonProps> = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="13" rx="3" ry="3" width="139" height="25" />
    <rect x="4" y="46" rx="3" ry="3" width="141" height="25" />
    <rect x="6" y="83" rx="0" ry="0" width="142" height="25" />
    <rect x="8" y="93" rx="0" ry="0" width="5" height="0" />
  </ContentLoader>
);

export default Skeleton;
