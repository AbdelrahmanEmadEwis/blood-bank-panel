'use client';

import { useActionState } from 'react';
import { Input, Select, SubmitButton } from '@/components/forms';
import { editBloodUnitAction } from '../actions/blood-units';
import { type BloodUnit, type EditBloodUnitValues } from '../types';
import { type ActionState } from '@/types/action-state';

interface EditBloodUnitFormProps {
  bloodUnit: BloodUnit;
}

const BLOOD_TYPE_OPTIONS = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
];

export function EditBloodUnitForm({ bloodUnit }: EditBloodUnitFormProps) {
  const [state, action] = useActionState<ActionState<EditBloodUnitValues>, FormData>(
    editBloodUnitAction,
    { status: 'idle', message: '' }
  );

  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className='space-y-6 w-full bg-white p-6 rounded-xl border'>
      <input type='hidden' name='bloodUnitId' value={bloodUnit.id} />

      {state.status === 'error' && state.message && !Object.keys(fe).length && (
        <div className='p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200'>
          {state.message}
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input
          label='Barcode'
          name='barcode'
          defaultValue={bloodUnit.barcode}
          placeholder='BC-TEST-001'
          error={fe.barcode?.[0]}
          className='md:col-span-2'
        />

        <Select
          label='Blood Type'
          name='blood_type'
          options={BLOOD_TYPE_OPTIONS}
          defaultValue={bloodUnit.blood_type}
          placeholder='Select blood type'
          error={fe.blood_type?.[0]}
          className='md:col-span-2'
        />
      </div>

      <div className='pt-4'>
        <SubmitButton pendingLabel='Saving changes...' className='w-full'>
          Update Blood Unit
        </SubmitButton>
      </div>
    </form>
  );
}
