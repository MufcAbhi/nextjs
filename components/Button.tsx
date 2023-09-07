import Image from 'next/image';
import React, { MouseEventHandler } from 'react'

type Props = {
  title: string;
  type?: 'button' | 'submit';
  leftIcon?: string;
  rightIcon?: string;
  isSubmitting?: boolean;
  handleClick: MouseEventHandler;
  bgColor?: string;
  textColor?: string;
};

const Button = ({
  title = 'button',
  type,
  leftIcon,
  rightIcon,
  isSubmitting,
  handleClick,
  bgColor,
  textColor,
}: Props) => {
  return (
    <button
      onClick={handleClick}
      disabled={isSubmitting}
      type={type}
      className={`flexCenter gap-3 px-4 py-3
        ${isSubmitting ? 'bg-black/50' : bgColor || 'bg-primary-purple'}
        ${textColor || 'text-white'}
        rounded-xl text-sm font-medium max-md:w-full`
      }
    >
      {leftIcon && (
        <Image
          src={leftIcon}
          height={14}
          width={14}
          alt="left"
        />
      )}
      {title}
      {rightIcon && (
        <Image
          src={rightIcon}
          height={14}
          width={14}
          alt="right"
        />
      )}
    </button>
  )
}

export default Button;
