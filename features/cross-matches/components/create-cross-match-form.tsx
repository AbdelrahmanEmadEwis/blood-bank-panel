'use client';

import { useActionState } from 'react';
import { AsyncSelect, SubmitButton } from '@/components/forms';
import { createCrossMatchAction } from '../actions/cross-matches';
import { getAllPatientsAction } from '@/features/patients';
import { getAllBloodUnitsAction } from '@/features/blood-units';
import type { ActionState } from '@/types/action-state';
import type { CreateCrossMatchValues } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Info } from 'lucide-react';

export function CreateCrossMatchForm() {
  const [state, action] = useActionState<ActionState<CreateCrossMatchValues>, FormData>(
    createCrossMatchAction,
    {
      status: 'idle',
      message: '',
    },
  );

  const fe = state.fieldErrors ?? {};

  const patientFetcher = async (query: string) => {
    try {
      const res = await getAllPatientsAction(1, 10, { search: query });
      return res.results.map((p) => ({
        value: p.id.toString(),
        label: `${p.fname} ${p.lname} (MRN: ${p.mrn})`,
      }));
    } catch (error) {
      console.error('Fetch patients error:', error);
      return [];
    }
  };

  const bloodUnitFetcher = async (query: string) => {
    try {
      const res = await getAllBloodUnitsAction(1, 10, { search: query });
      return res.results.map((u) => ({
        value: u.id.toString(),
        label: `${u.barcode} (${u.blood_type})`,
      }));
    } catch (error) {
      console.error('Fetch blood units error:', error);
      return [];
    }
  };

  return (
    <Card className='max-w-2xl mx-auto border-slate-200 shadow-xl rounded-2xl overflow-hidden'>
      <div className='bg-blue-600 px-6 py-8 text-white'>
        <h2 className='text-2xl font-bold flex items-center gap-2'>
          <Search className='w-6 h-6' />
          Initiate Cross-Match
        </h2>
        <p className='text-blue-100 mt-2 text-sm'>
          Select a patient and a blood unit to start the compatibility testing procedure.
        </p>
      </div>

      <CardContent className='p-8'>
        <form action={action} className='space-y-8'>
          {state.status === 'error' && !Object.keys(fe).length && (
            <div className='p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-start gap-3'>
              <div className='mt-0.5'>⚠️</div>
              {state.message}
            </div>
          )}

          <div className='space-y-6'>
            <div className='space-y-2'>
              <AsyncSelect
                label='Select Patient'
                name='patient_id'
                placeholder='Search by MRN or patient name...'
                fetcher={patientFetcher}
                error={fe.patient_id?.[0]}
              />
              <div className='flex items-center gap-2 px-1'>
                <Info className='w-3 h-3 text-slate-400' />
                <span className='text-[10px] text-slate-400 uppercase font-bold tracking-tight'>Ensure MRN accuracy before selection</span>
              </div>
            </div>

            <div className='space-y-2'>
              <AsyncSelect
                label='Select Blood Unit'
                name='blood_unit_id'
                placeholder='Search by barcode...'
                fetcher={bloodUnitFetcher}
                error={fe.blood_unit_id?.[0]}
              />
              <div className='flex items-center gap-2 px-1'>
                <Info className='w-3 h-3 text-slate-400' />
                <span className='text-[10px] text-slate-400 uppercase font-bold tracking-tight'>Verify ABO/Rh compatibility group</span>
              </div>
            </div>
          </div>

          <div className='pt-6 border-t border-slate-100 flex flex-col gap-3'>
            <SubmitButton pendingLabel='Initiating procedure...' className='w-full h-12 rounded-xl text-base font-bold bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg'>
              Start Cross Match
            </SubmitButton>
            <p className='text-[10px] text-slate-400 text-center tracking-normal'>
              Starting this procedure will create a pending cross-match record in the system.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
