import { useRef, useState } from 'react';
import { EMPLOYMENT_TYPE_OPTIONS } from '../../../constants';
import Select from '../../../components/ui/Select';
import SelectLocation from '../select-location';
import styles from './FieldDetail.module.css';
import Textfield from '../../../components/ui/Textfield';
import { cn } from '../../../utils/cn';
import type { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import type { DetailsInput } from '../../../schemas/details.schema';

interface FieldDetailProps {
  register: UseFormRegister<DetailsInput>;
  errors: FieldErrors<DetailsInput>;
  watch: UseFormWatch<DetailsInput>;
  setValue: UseFormSetValue<DetailsInput>;
  onEmploymentTypeChange?: (value: string) => void;
  onLocationChange?: (value: string, id: number) => void;
  locationValue?: string;
}

const FieldDetail = ({
  register,
  errors,
  watch,
  setValue,
  onEmploymentTypeChange,
  onLocationChange,
  locationValue,
}: FieldDetailProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileName('');
      setValue('photo', '', { shouldValidate: true });
      return;
    }

    if (!file.type.startsWith('image/')) {
      setFileName('');
      setValue('photo', '', { shouldValidate: true });
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (base64String) {
        setValue('photo', base64String, { shouldValidate: true });
      }
    };
    reader.onerror = () => {
      setFileName('');
      setValue('photo', '', { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles['field-detail']}>
      <div className={cn(styles['textfield'], styles['field-detail__photo'])}>
        <label htmlFor="photo">Photo</label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            ref={fileInputRef}
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleFileChange}
            onBlur={() => register('photo').onBlur({ target: { name: 'photo' } })}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '8px 16px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: '#fff',
            }}
          >
            Choose File
          </button>
          {fileName && (
            <span style={{ color: '#666', fontSize: '0.875rem' }}>
              {fileName}
            </span>
          )}
        </div>
        <input
          type="hidden"
          {...register('photo')}
        />
      </div>
      {errors.photo && (
        <span style={{ color: 'red', fontSize: '0.875rem' }}>
          {errors.photo.message}
        </span>
      )}
      <Select
        label="Employment Type"
        id="employment-type"
        options={EMPLOYMENT_TYPE_OPTIONS}
        placeholder="Enter employment type"
        value={watch('employmentType')}
        onChange={onEmploymentTypeChange}
        onBlur={() => register('employmentType').onBlur()}
        error={errors.employmentType?.message}
      />
      <SelectLocation
        value={locationValue}
        onChange={onLocationChange}
        onBlur={() => register('locationId').onBlur()}
        error={errors.locationId?.message}
      />
      <Textfield
        className={styles['field-detail__notes']}
        label="Notes"
        id="notes"
        placeholder="Enter notes"
        {...register('notes')}
      />
      {errors.notes && (
        <span style={{ color: 'red', fontSize: '0.875rem' }}>
          {errors.notes.message}
        </span>
      )}
    </div>
  );
};

export default FieldDetail;
