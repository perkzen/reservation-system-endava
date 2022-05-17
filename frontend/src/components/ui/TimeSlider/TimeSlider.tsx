import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
import type { SliderProps } from 'rc-slider';
import raf from 'rc-util/lib/raf';
import Tooltip from 'rc-tooltip';
import classes from './TimeSlider.module.scss';

const HandleTooltip = (props: {
  value: number;
  children: ReactElement;
  visible: boolean;
  tipFormatter?: (value: number) => ReactNode;
}) => {
  const {
    value,
    children,
    visible,
    tipFormatter = (val) => `${val} %`,
    ...restProps
  } = props;

  const tooltipRef = useRef<any>();
  const rafRef = useRef<number | null>(null);

  function cancelKeepAlign() {
    raf.cancel(rafRef.current!);
  }

  function keepAlign() {
    rafRef.current = raf(() => {
      tooltipRef.current?.forcePopupAlign();
    });
  }

  useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [value, visible]);

  return (
    <Tooltip
      placement="top"
      overlay={tipFormatter(value)}
      overlayInnerStyle={{ minHeight: 'auto' }}
      ref={tooltipRef}
      visible={visible}
      {...restProps}
    >
      {children}
    </Tooltip>
  );
};

const TimeSlider = ({
  tipFormatter,
  tipProps,
  ...props
}: SliderProps & {
  tipFormatter?: (value: number) => React.ReactNode;
  tipProps: any;
}) => {
  const tipHandleRender: SliderProps['handleRender'] = (node, handleProps) => {
    return (
      <HandleTooltip
        value={handleProps.value}
        visible={handleProps.dragging}
        tipFormatter={tipFormatter}
        {...tipProps}
      >
        {node}
      </HandleTooltip>
    );
  };

  return (
    <Slider
      {...props}
      className={classes.Slider}
      dotStyle={{ borderColor: '#31363B' }}
      activeDotStyle={{ borderColor: '#31363B' }}
      trackStyle={{ backgroundColor: '#31363B' }}
      handleStyle={{ backgroundColor: '#DE411B' }}
      handleRender={tipHandleRender}
      range
      pushable
    />
  );
};

export default TimeSlider;
