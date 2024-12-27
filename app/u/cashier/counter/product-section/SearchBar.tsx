"use client"

import React from 'react'
import { Input } from '../../../../../components/ui/input';
import { Search } from 'lucide-react';

interface ISearchBarProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = (props: ISearchBarProps) => {
  const { keyword, setKeyword } = props;

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  }

  return (
    <div className="relative fixed-0">
      <Input
        type="text"
        value={keyword}
        onChange={handleInputChange}
        placeholder='Search something sweet in your mind...'
        className='rounded-full my-2 h-12 outline-none'
      />

      <div className="m-1 h-10 w-10 rounded-full absolute top-0 right-0 flex justify-center items-center">
        <Search />
      </div>
    </div >
  )
}

export default SearchBar
