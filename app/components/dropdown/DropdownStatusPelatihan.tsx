"use client";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FcCancel } from "react-icons/fc";

interface DropdownProps {
  title: string;
  link?: string;
  onPublish?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
}

const DropdownStatusPelatihan: React.FC<DropdownProps> = ({
  title,
  link,
  onPublish,
  onClose,
  onCancel,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="text-sm font-semibold hover:bg-slate-100 transition py-2 px-3 border rounded-lg outline-none hover:cursor-pointer">
          {title}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white shadow-md border rounded-lg w-40"
          align="end"
        >
          <DropdownMenu.Item
            className="flex items-center gap-2 text-slate-300 hover:text-slate-600 hover:outline-none hover:cursor-pointer rounded-md py-2 px-3 hover:bg-slate-100 font-semibold text-left"
            onClick={onPublish}
          >
            <MdOutlinePublishedWithChanges
              size={20}
              className="text-green-600"
            />
            <span>Publish</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex items-center gap-2 text-slate-300 hover:text-slate-600 hover:outline-none hover:cursor-pointer rounded-md py-2 px-3 hover:bg-slate-100 font-semibold text-left"
            onClick={onClose}
          >
            <AiOutlineCloseCircle size={20} />
            <span>Close</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex items-center gap-2 text-slate-300 hover:text-slate-600 hover:outline-none hover:cursor-pointer rounded-md py-2 px-3 hover:bg-slate-100 font-semibold text-left"
            onClick={onCancel}
          >
            <FcCancel size={20} />
            <span>Cancel</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownStatusPelatihan;
