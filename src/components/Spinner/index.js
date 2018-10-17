import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components'

export const Spinner = styled.div`
  .loading-spinner,
  .loading-spinner-white {
    background: #000;
    width: 25px;
    height: 6px;
    position: absolute;
    top: calc(50% - 6px / 2);
    left: calc(50% - 25px / 2);
    -webkit-animation: spin 1s infinite linear;
    -moz-animation: spin 1s infinite linear;
    -o-animation: spin 1s infinite linear;
    -ms-animation: spin 1s infinite linear;
    animation: spin 1s infinite linear;
  }
  .loading-spinner-small,
  .loading-spinner-small-white {
    background: #000;
    width: 20px;
    height: 4px;
    position: absolute;
    top: calc(50% - 4px / 2);
    left: calc(50% - 20px / 2);
    -webkit-animation: spin 1s infinite linear;
    -moz-animation: spin 1s infinite linear;
    -o-animation: spin 1s infinite linear;
    -ms-animation: spin 1s infinite linear;
    animation: spin 1s infinite linear;
  }
  .loading-spinner-white {
    background: #fff;
  }
  .loading-spinner-small-white {
    background: #fff;
  }
  .loading-ellipsis > span {
    letter-spacing: 2px;
  }
  .loading-ellipsis > span:nth-child(1) {
    -webkit-animation: fade 1s infinite;
    -moz-animation: fade 1s infinite;
    -o-animation: fade 1s infinite;
    -ms-animation: fade 1s infinite;
    animation: fade 1s infinite;
    -webkit-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    -o-animation-delay: 0.2s;
    -ms-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .loading-ellipsis > span:nth-child(2) {
    -webkit-animation: fade 1s infinite;
    -moz-animation: fade 1s infinite;
    -o-animation: fade 1s infinite;
    -ms-animation: fade 1s infinite;
    animation: fade 1s infinite;
    -webkit-animation-delay: 0.4s;
    -moz-animation-delay: 0.4s;
    -o-animation-delay: 0.4s;
    -ms-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  .loading-ellipsis > span:nth-child(3) {
    -webkit-animation: fade 1s infinite;
    -moz-animation: fade 1s infinite;
    -o-animation: fade 1s infinite;
    -ms-animation: fade 1s infinite;
    animation: fade 1s infinite;
    -webkit-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
    -o-animation-delay: 0.6s;
    -ms-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  @-moz-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
@-o-keyframes spin {
100% {
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  transform: rotate(360deg);
}
}
@keyframes spin {
100% {
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  transform: rotate(360deg);
}
}
@-moz-keyframes fade {
0% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
50% {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
100% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
}
@-webkit-keyframes fade {
0% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
50% {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
100% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
}
@-o-keyframes fade {
0% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
50% {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
100% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
}
@keyframes fade {
0% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
50% {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
100% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
}
.loading-spinner,
.loading-spinner-white {
background: #000;
width: 25px;
height: 6px;
position: absolute;
top: calc(50% - 6px / 2);
left: calc(50% - 25px / 2);
-webkit-animation: spin 1s infinite linear;
-moz-animation: spin 1s infinite linear;
-o-animation: spin 1s infinite linear;
-ms-animation: spin 1s infinite linear;
animation: spin 1s infinite linear;
}
.loading-spinner-small,
.loading-spinner-small-white {
background: #000;
width: 20px;
height: 4px;
position: absolute;
top: calc(50% - 4px / 2);
left: calc(50% - 20px / 2);
-webkit-animation: spin 1s infinite linear;
-moz-animation: spin 1s infinite linear;
-o-animation: spin 1s infinite linear;
-ms-animation: spin 1s infinite linear;
animation: spin 1s infinite linear;
}
.loading-spinner-white {
background: #fff;
}
.loading-spinner-small-white {
background: #fff;
}
.loading-ellipsis > span {
letter-spacing: 2px;
}
.loading-ellipsis > span:nth-child(1) {
-webkit-animation: fade 1s infinite;
-moz-animation: fade 1s infinite;
-o-animation: fade 1s infinite;
-ms-animation: fade 1s infinite;
animation: fade 1s infinite;
-webkit-animation-delay: 0.2s;
-moz-animation-delay: 0.2s;
-o-animation-delay: 0.2s;
-ms-animation-delay: 0.2s;
animation-delay: 0.2s;
}
.loading-ellipsis > span:nth-child(2) {
-webkit-animation: fade 1s infinite;
-moz-animation: fade 1s infinite;
-o-animation: fade 1s infinite;
-ms-animation: fade 1s infinite;
animation: fade 1s infinite;
-webkit-animation-delay: 0.4s;
-moz-animation-delay: 0.4s;
-o-animation-delay: 0.4s;
-ms-animation-delay: 0.4s;
animation-delay: 0.4s;
}
.loading-ellipsis > span:nth-child(3) {
-webkit-animation: fade 1s infinite;
-moz-animation: fade 1s infinite;
-o-animation: fade 1s infinite;
-ms-animation: fade 1s infinite;
animation: fade 1s infinite;
-webkit-animation-delay: 0.6s;
-moz-animation-delay: 0.6s;
-o-animation-delay: 0.6s;
-ms-animation-delay: 0.6s;
animation-delay: 0.6s;
}
@-moz-keyframes spin {
100% {
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  transform: rotate(360deg);
}
}
@-webkit-keyframes spin {
100% {
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  transform: rotate(360deg);
}
}
@-o-keyframes spin {
100% {
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  transform: rotate(360deg);
}
}
@keyframes spin {
100% {
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  transform: rotate(360deg);
}
}
@-moz-keyframes fade {
0% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
50% {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
100% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
}
@-webkit-keyframes fade {
0% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
50% {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
100% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
}
@-o-keyframes fade {
0% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
50% {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
100% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
}
@keyframes fade {
0% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
50% {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
100% {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
}

`

const SpinnerComponent = () => (
  <div style={{display: 'flex', justifyContent: 'center'}}>
    <IconButton>
      <Spinner>
        <div className="loading-spinner" />
      </Spinner>
    </IconButton>
  </div>
)

export default SpinnerComponent
