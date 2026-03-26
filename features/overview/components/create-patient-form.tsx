'use client';

import { useActionState } from 'react';
import { Input, Select, SubmitButton } from '@/components/forms';
import { createPatientAction } from '@/features/patients';
import type { ActionState } from '@/types/action-state';
import type { CreatePatientValues } from '@/features/patients';

const SEX_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const BLOOD_TYPE_OPTIONS = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
];

const ANTIBODY_OPTIONS = [
  { label: 'Positive', value: 'pos' },
  { label: 'Negative', value: 'neg' },
  { label: 'ND', value: 'nd' },
];

export function CreatePatientForm() {
  const [state, action] = useActionState<ActionState<CreatePatientValues>, FormData>(
    createPatientAction,
    {
      status: 'idle',
      message: '',
    },
  );

  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className='space-y-6 w-full bg-white p-6 rounded-xl border'>
      {state.status === 'error' && !Object.keys(fe).length && (
        <div className='p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200'>
          {state.message}
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-1.5 md:col-span-2'>
          <label className='text-sm font-medium'>MRN</label>
          <Input name='mrn' placeholder='Medical Record Number' error={fe.mrn?.[0]} />
        </div>

        <div className='space-y-1.5'>
          <label className='text-sm font-medium'>First Name</label>
          <Input name='fname' placeholder='First Name' error={fe.fname?.[0]} />
        </div>

        <div className='space-y-1.5'>
          <label className='text-sm font-medium'>Last Name</label>
          <Input name='lname' placeholder='Last Name' error={fe.lname?.[0]} />
        </div>

        <div className='space-y-1.5'>
          <label className='text-sm font-medium'>Date of Birth</label>
          <Input name='date_of_birth' type='date' error={fe.date_of_birth?.[0]} />
        </div>

        <Select
          label='Sex'
          name='sex'
          options={SEX_OPTIONS}
          placeholder='Select sex'
          error={fe.sex?.[0]}
        />

        <Select
          label='Blood Type'
          name='blood_type'
          options={BLOOD_TYPE_OPTIONS}
          placeholder='Select blood type'
          error={fe.blood_type?.[0]}
        />

        <Select
          label='Anti A'
          name='anti_a'
          options={ANTIBODY_OPTIONS}
          placeholder='Select Anti A result'
          error={fe.anti_a?.[0]}
        />

        <Select
          label='Anti B'
          name='anti_b'
          options={ANTIBODY_OPTIONS}
          placeholder='Select Anti B result'
          error={fe.anti_b?.[0]}
        />

        <Select
          label='Anti D'
          name='anti_d'
          options={ANTIBODY_OPTIONS}
          placeholder='Select Anti D result'
          error={fe.anti_d?.[0]}
        />
      </div>

      <div className='pt-4'>
        <SubmitButton pendingLabel='Creating patient...' className='w-full'>
          Create Patient
        </SubmitButton>
      </div>
    </form>
  );
}
