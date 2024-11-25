import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { getDeviconClassName } from "@/lib/utils";

import { Badge } from "../ui/badge";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard: React.FC<Props> = ({
  _id,
  name,
  questions,
  showCount = false,
  compact = false,
  remove = false,
  isButton = false,
  handleRemove,
}) => {
  const iconClass = getDeviconClassName(name);

  const handlePreventDefault = (e: React.MouseEvent) => e.preventDefault();

  const RenderBadge = () => (
    <Badge className="subtle-medium background-light800_dark300 text-light400_light500 flex flex-row gap-2 rounded-md border-none px-4 py-2 uppercase">
      <div className="flex-center space-x-2">
        <i className={`${iconClass} text-sm`}></i>
        <span>{name}</span>
      </div>
      {remove && handleRemove && (
        <Image
          src="/icons/close.svg"
          width={12}
          height={12}
          alt="close icon"
          className="cursor-pointer object-contain invert-0 dark:invert"
          onClick={handleRemove}
        />
      )}
    </Badge>
  );

  const RenderQuestionsCount = () =>
    showCount && (
      <p className="small-medium text-dark500_light700">{questions}</p>
    );

  const RenderContent = () => (
    <>
      <RenderBadge />
      {RenderQuestionsCount()}
    </>
  );

  if (compact) {
    const Container = isButton ? "button" : Link;
    const containerProps = isButton
      ? { onClick: handlePreventDefault }
      : { href: ROUTES.TAGS(_id) };

    return (
      <Container {...containerProps} className="flex justify-between gap-2">
        <RenderContent />
      </Container>
    );
  }

  return null; // Return a default value if `compact` is false and no additional cases are provided.
};

export default TagCard;
