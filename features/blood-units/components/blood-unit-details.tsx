'use client';

import { type BloodUnitDetail } from '../types';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Badge 
} from '@/components/ui';
import { 
  ArrowLeft, 
  Barcode, 
  Droplets, 
  History,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface BloodUnitDetailsProps {
  bloodUnit: BloodUnitDetail;
}

export function BloodUnitDetails({ bloodUnit }: BloodUnitDetailsProps) {
  return (
    <div className='max-w-5xl mx-auto py-8 px-4 space-y-8'>
      {/* Header section */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='space-y-1'>
          <Link 
            href='/dashboard/blood-units' 
            className='flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium mb-2 w-fit'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Inventory
          </Link>
          <div className='flex items-center gap-3'>
            <h1 className='text-2xl font-bold text-slate-900'>Blood Unit</h1>
            <Badge variant='outline' className='text-blue-600 border-blue-200 bg-blue-50 font-mono'>
              #{bloodUnit.id}
            </Badge>
          </div>
          <p className='text-slate-500'>View identification and matching history for this unit.</p>
        </div>

        <div className='flex gap-2'>
          <Button variant='outline' className='rounded-lg h-9 text-sm'>
            <Link href={`/dashboard/blood-units/${bloodUnit.id}/edit`}>Edit Details</Link>
          </Button>
        </div>
      </div>

      {/* Core info grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card className='rounded-xl border border-slate-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-semibold text-slate-500 flex items-center gap-2 uppercase tracking-tight'>
              <Barcode className='w-4 h-4 text-slate-400' />
              Unit Identification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-mono font-bold text-slate-900'>{bloodUnit.barcode}</div>
            <div className='text-xs text-slate-400 mt-1 uppercase font-medium'>System Barcode</div>
          </CardContent>
        </Card>

        <Card className='rounded-xl border border-slate-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-semibold text-slate-500 flex items-center gap-2 uppercase tracking-tight'>
              <Droplets className='w-4 h-4 text-rose-400' />
              Blood Specification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold text-rose-600'>{bloodUnit.blood_type}</div>
            <div className='text-xs text-slate-400 mt-1 uppercase font-medium'>Rh/ABO Group</div>
          </CardContent>
        </Card>
      </div>

      {/* Cross-match History section */}
      <div className='space-y-4'>
        <div className='flex items-center gap-3 px-1'>
          <History className='w-5 h-5 text-slate-400' />
          <h2 className='text-lg font-bold text-slate-900'>Cross-Match History</h2>
        </div>

        {bloodUnit.cross_matches.length > 0 ? (
          <div className='space-y-3'>
            {bloodUnit.cross_matches.map((match) => (
              <Card key={match.id} className='rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors'>
                <CardContent className='p-6'>
                  <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div className='flex items-center gap-4'>
                      <div className='w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold'>
                        {match.patient.fname[0]}{match.patient.lname[0]}
                      </div>
                      <div className='space-y-0.5'>
                        <div className='font-bold text-slate-900'>
                          {match.patient.fname} {match.patient.lname}
                        </div>
                        <div className='text-xs text-slate-500 flex items-center gap-2'>
                          <span className='font-mono'>MRN: {match.patient.mrn}</span>
                          <span className='w-1 h-1 bg-slate-300 rounded-full' />
                          <span>Type: {match.patient.blood_type}</span>
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center gap-4'>
                      <div className='text-right hidden sm:block'>
                        <div className='text-xs text-slate-500'>Result</div>
                        <div className={`text-sm font-bold ${match.final_result === 'Compatible' ? 'text-green-600' : 'text-rose-600'}`}>
                          {match.final_result}
                        </div>
                      </div>
                      <Badge className={`${match.final_result === 'Compatible' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'} rounded-lg px-3 py-1 text-xs whitespace-nowrap`}>
                         {match.final_result.toUpperCase()}
                      </Badge>
                      <Link 
                        href={`/dashboard/cross-matches/${match.id}`}
                        className='p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600'
                      >
                        <ExternalLink className='w-4 h-4' />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className='rounded-xl border border-dashed border-slate-300 bg-slate-50/50'>
            <CardContent className='py-12 flex flex-col items-center justify-center space-y-3'>
              <div className='text-slate-400'>No cross-match records found for this unit.</div>
              <Button variant='outline' className='rounded-lg text-sm h-9'>
                <Link href='/dashboard/cross-matches/create'>Initiate First Match</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
