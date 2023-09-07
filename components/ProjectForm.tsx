"use client"

import { SessionInterface } from '@/common.types';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import FormField from './FormField';
import { categoryFilters } from '../app/constants';
import CustomMenu from './CustomMenu';
import Button from './Button';
import { createNewProject, fetchToken } from '@/lib/actions';
import { useRouter } from 'next/navigation';

type Props = {
  type: string,
  session: SessionInterface,
}

const ProjectForm = ({ type, session }: Props) => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    liveSiteUrl: '',
    githubUrl: '',
    category: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const { token } = await fetchToken();
    
      if (type === 'create') {
        await createNewProject(form, session?.user?.id, token);

        router.push('/');
      }
    } catch (error) {
      console.log('error while creating project =>', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      return alert('Please upload an image file');
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange('image', result);
    }
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm(prevForm => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  return (
    <form
      className="flexStart form"
      onSubmit={handleFormSubmit}
    >
      <div className="flexStart form_image-container">
        <label className="flexCenter form_image-label" htmlFor="poster">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === 'create'}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            className="sm:p-10 object-contain z-20"
            alt="Project poster"
            fill
            src={form?.image}
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexible"
        setState={(value) => handleStateChange('title', value)}
      />

      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer"
        setState={(value) => handleStateChange('description', value)}
      />

      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://jsmastery.pro"
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />

      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder="https://github.com"
        setState={(value) => handleStateChange('githubUrl', value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className="flexStart w-full">
        <Button
          handleClick={handleFormSubmit}
          title={isSubmitting ? 'Submitting' : 'Submit'}
          type="submit"
          leftIcon={isSubmitting ? "" : '/plus.svg'}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  )
}

export default ProjectForm
