import { useState } from 'react';

export function useEventFormValidation() {
  const [errors, setErrors] = useState({
    title: '',
      description: '',
      location: '',
    });
  
    const validateForm = (values: { title: string; description: string; location: string }) => {
      const newErrors = {
        title: values.title.length < 3 ? 'Title must be at least 3 characters' : '',
        description: values.description.length < 10 ? 'Description must be at least 10 characters' : '',
        location: !values.location ? 'Location is required' : '',
      };
      setErrors(newErrors);
      return !Object.values(newErrors).some(error => error);
    };
  
  return { errors, validateForm };
}
