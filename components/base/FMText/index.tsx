import * as React from "react";

interface IProps {
  children: string | string[] | React.ReactNode;
  display01?: boolean;
  display02?: boolean;
  headline01?: boolean;
  headline02?: boolean;
  title01?: boolean;
  title02?: boolean;
  subHeadline01?: boolean;
  body01?: boolean;
  body02?: boolean;
  body03?: boolean;
  body04?: boolean;
  caption01?: boolean;
  caption02?: boolean;
  caption03?: boolean;
  caption04?: boolean;
  color?: string;
}

function FMText({
  children,
  display01,
  display02,
  headline01,
  headline02,
  title01,
  title02,
  subHeadline01,
  body01,
  body02,
  body03,
  body04,
  caption01,
  caption02,
  caption03,
  caption04,
  color,
}: IProps) {
  const style: React.CSSProperties = React.useMemo(() => {
    const defaultStyle = {
      padding: 0,
      margin: 0,
      color: color,
      whiteSpace: "pre-wrap",
    } as React.CSSProperties;
    if (display01)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "2.25rem",
        lineHeight: "2.625rem",
        fontWeight: 600,
        ...defaultStyle,
      } as React.CSSProperties;
    if (display02)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "2rem",
        lineHeight: "2.5rem",
        fontWeight: 600,
        ...defaultStyle,
      } as React.CSSProperties;
    if (headline01)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "1.5rem",
        lineHeight: "2.25rem",
        fontWeight: 600,
        ...defaultStyle,
      } as React.CSSProperties;
    if (headline02)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "1.5rem",
        lineHeight: "2.25rem",
        fontWeight: 500,
        ...defaultStyle,
      } as React.CSSProperties;
    if (title01)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "1.25rem",
        lineHeight: "2rem",
        fontWeight: 600,
        ...defaultStyle,
      } as React.CSSProperties;
    if (title02)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "1.25rem",
        lineHeight: "2rem",
        fontWeight: 500,
        ...defaultStyle,
      } as React.CSSProperties;
    if (subHeadline01)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "1rem",
        lineHeight: "1.5rem",
        fontWeight: 600,
        ...defaultStyle,
      } as React.CSSProperties;
    if (body01)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "1rem",
        lineHeight: "1.5rem",
        fontWeight: 500,
        ...defaultStyle,
      } as React.CSSProperties;
    if (body02)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "1rem",
        lineHeight: "1.5rem",
        fontWeight: 400,
        ...defaultStyle,
      } as React.CSSProperties;
    if (body03)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        fontWeight: 500,
        ...defaultStyle,
      } as React.CSSProperties;
    if (body04)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        fontWeight: 400,
        ...defaultStyle,
      } as React.CSSProperties;
    if (caption01)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "0.75rem",
        lineHeight: "1.25rem",
        fontWeight: 500,
        ...defaultStyle,
      } as React.CSSProperties;
    if (caption02)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "0.75rem",
        lineHeight: "1.25rem",
        fontWeight: 500,
        ...defaultStyle,
      } as React.CSSProperties;
    if (caption03)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "0.625rem",
        lineHeight: "1rem",
        fontWeight: 500,
        ...defaultStyle,
      } as React.CSSProperties;
    if (caption04)
      return {
        fontFamily: "Spoqa Han Sans Neo, sans-serif",
        fontSize: "0.625rem",
        lineHeight: "1rem",
        fontWeight: 400,
        ...defaultStyle,
      } as React.CSSProperties;
    return {
      fontFamily: "Spoqa Han Sans Neo, sans-serif",
      fontSize: "1rem",
      lineHeight: "1.5rem",
      fontWeight: 500,
      ...defaultStyle,
    } as React.CSSProperties;
  }, [
    display01,
    display02,
    headline01,
    headline02,
    title01,
    title02,
    subHeadline01,
    body01,
    body02,
    body03,
    body04,
    caption01,
    caption02,
    caption03,
    caption04,
    color,
  ]);
  return <span style={style}>{children}</span>;
}

export default React.memo(FMText);
