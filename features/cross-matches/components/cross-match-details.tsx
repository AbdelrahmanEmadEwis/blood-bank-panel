'use client';

import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Badge,
  Button
} from '@/components/ui';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  User, 
  Barcode, 
  Activity,
  Calendar,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  PenTool
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import type { CrossMatch } from '../types';
import { updateCrossMatchStatusAction, signCrossMatchAction } from '../actions/cross-matches';
import { useState } from 'react';
import { toast } from 'sonner';

interface CrossMatchDetailsProps {
  crossMatch: CrossMatch;
}

export function CrossMatchDetails({ crossMatch }: CrossMatchDetailsProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [signatureCode, setSignatureCode] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusStyles = (res: string) => {
    switch (res.toLowerCase()) {
      case "compatible":
        return "bg-green-50 text-green-700 border-green-200";
      case "incompatible":
        return "bg-red-50 text-red-700 border-red-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (newStatus === crossMatch.final_result) return;
    
    setIsUpdating(true);
    const result = await updateCrossMatchStatusAction(crossMatch.id, newStatus);
    
    if (result.ok) {
      toast.success(`Result updated to ${newStatus}`);
    } else {
      toast.error(result.error);
    }
    setIsUpdating(false);
  };

  const handleSign = async () => {
    if (!signatureCode) {
      toast.error('Signature code is required');
      return;
    }

    setIsSigning(true);
    const result = await signCrossMatchAction(crossMatch.id, signatureCode);
    
    if (result.ok) {
      toast.success('Cross-match signed successfully');
      setIsDialogOpen(false);
      setSignatureCode('');
    } else {
      toast.error(result.error);
    }
    setIsSigning(false);
  };

  return (
    <div className='max-w-5xl mx-auto py-8 px-4 space-y-8'>
      {/* Header section */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='space-y-1'>
          <Link 
            href='/dashboard/matches' 
            className='flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium mb-2 w-fit'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to All Matches
          </Link>
          <div className='flex items-center gap-3'>
            <h1 className='text-2xl font-bold text-slate-900'>Cross Match Details</h1>
            <Badge variant='outline' className='text-blue-600 border-blue-200 bg-blue-50 font-mono'>
              #{crossMatch.id}
            </Badge>
          </div>
          <p className='text-slate-500 italic'>Detailed analysis and compatibility results for this procedure.</p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Patient & Blood Unit Info */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Patient Card */}
          <Card className='rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
            <CardHeader className='bg-slate-50 border-b border-slate-200 py-4'>
              <CardTitle className='text-sm font-semibold text-slate-700 flex items-center gap-2 uppercase tracking-tight'>
                <User className='w-4 h-4 text-slate-500' />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12'>
                <div className='space-y-1'>
                  <div className='text-xs text-slate-400 uppercase font-medium'>Full Name</div>
                  <div className='font-bold text-slate-900 text-lg'>{crossMatch.patient.fname} {crossMatch.patient.lname}</div>
                </div>
                <div className='space-y-1'>
                  <div className='text-xs text-slate-400 uppercase font-medium'>MRN</div>
                  <div className='font-mono font-bold text-slate-900'>{crossMatch.patient.mrn}</div>
                </div>
                <div className='space-y-1'>
                  <div className='text-xs text-slate-400 uppercase font-medium'>Gender & Age</div>
                  <div className='text-slate-700 capitalize'>{crossMatch.patient.sex}, {crossMatch.patient.age} years</div>
                </div>
                <div className='space-y-1'>
                  <div className='text-xs text-slate-400 uppercase font-medium'>Blood Group</div>
                  <div className='font-bold text-rose-600'>{crossMatch.patient.blood_type}</div>
                </div>
              </div>
              
              <div className='mt-8 pt-6 border-t border-slate-100'>
                <div className='text-xs text-slate-400 uppercase font-medium mb-3'>Antibody Screening</div>
                <div className='flex flex-wrap gap-4'>
                  <div className='bg-slate-50 px-3 py-2 rounded-lg border border-slate-200'>
                    <span className='text-xs text-slate-500 mr-2'>Anti-A:</span>
                    <span className='font-bold text-slate-900 uppercase'>{crossMatch.patient.anti_a}</span>
                  </div>
                  <div className='bg-slate-50 px-3 py-2 rounded-lg border border-slate-200'>
                    <span className='text-xs text-slate-500 mr-2'>Anti-B:</span>
                    <span className='font-bold text-slate-900 uppercase'>{crossMatch.patient.anti_b}</span>
                  </div>
                  <div className='bg-slate-50 px-3 py-2 rounded-lg border border-slate-200'>
                    <span className='text-xs text-slate-500 mr-2'>Anti-D:</span>
                    <span className='font-bold text-slate-900 uppercase'>{crossMatch.patient.anti_d}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blood Unit Card */}
          <Card className='rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
            <CardHeader className='bg-slate-50 border-b border-slate-200 py-4'>
              <CardTitle className='text-sm font-semibold text-slate-700 flex items-center gap-2 uppercase tracking-tight'>
                <Barcode className='w-4 h-4 text-slate-500' />
                Assigned Blood Unit
              </CardTitle>
            </CardHeader>
            <CardContent className='p-6 flex flex-col md:flex-row items-start md:items-center gap-8'>
               <div className='space-y-1'>
                  <div className='text-xs text-slate-400 uppercase font-medium'>Unit Barcode</div>
                  <div className='font-mono font-bold text-2xl text-slate-900'>{crossMatch.blood_unit.barcode}</div>
                </div>
                <div className='hidden md:block w-px h-12 bg-slate-100' />
                <div className='space-y-1'>
                  <div className='text-xs text-slate-400 uppercase font-medium'>Unit Blood Type</div>
                  <div className='font-bold text-2xl text-rose-600'>{crossMatch.blood_unit.blood_type}</div>
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Results */}
        <div className='space-y-6'>
          {/* Final Result Card */}
          <Card className='rounded-xl border border-slate-200 shadow-sm bg-slate-50/30 overflow-hidden'>
             <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-semibold text-slate-500 flex items-center gap-2 uppercase tracking-tight'>
                <Activity className='w-4 h-4 text-blue-500' />
                Final Result
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className={`px-4 py-4 rounded-xl border text-center font-bold text-2xl uppercase tracking-wider relative ${getStatusStyles(crossMatch.final_result)}`}>
                {isUpdating && <div className='absolute inset-0 bg-white/50 flex items-center justify-center rounded-xl'><Loader2 className='w-6 h-6 animate-spin text-blue-600' /></div>}
                {crossMatch.final_result}
              </div>

              {!crossMatch.signed_at && (
                <div className='space-y-3 pt-2'>
                  <div className='text-[10px] text-slate-400 uppercase font-bold tracking-wider px-1'>Update Result</div>
                  <div className='grid grid-cols-1 gap-2'>
                    <Button 
                      variant='outline' 
                      size='sm' 
                      className='justify-start h-10 border-slate-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all group'
                      onClick={() => handleUpdateStatus('Compatible')}
                      disabled={isUpdating || isSigning}
                    >
                      <CheckCircle2 className='w-4 h-4 mr-2 text-slate-400 group-hover:text-green-500' />
                      Mark as Compatible
                    </Button>
                    <Button 
                      variant='outline' 
                      size='sm' 
                      className='justify-start h-10 border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all group'
                      onClick={() => handleUpdateStatus('Incompatible')}
                      disabled={isUpdating || isSigning}
                    >
                      <XCircle className='w-4 h-4 mr-2 text-slate-400 group-hover:text-red-500' />
                      Mark as Incompatible
                    </Button>
                    <Button 
                      variant='outline' 
                      size='sm' 
                      className='justify-start h-10 border-slate-200 hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-200 transition-all group'
                      onClick={() => handleUpdateStatus('Pending')}
                      disabled={isUpdating || isSigning}
                    >
                      <Clock className='w-4 h-4 mr-2 text-slate-400 group-hover:text-yellow-500' />
                      Reset to Pending
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Signature/Validation Card */}
          <Card className='rounded-xl border border-slate-200 shadow-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-semibold text-slate-500 flex items-center gap-2 uppercase tracking-tight'>
                <ShieldCheck className='w-4 h-4 text-emerald-500' />
                Verification & Signing
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-5'>
              <div className='flex items-start gap-3'>
                <UserCheck className='w-5 h-5 text-slate-300 mt-0.5' />
                <div className='space-y-0.5'>
                  <div className='text-xs text-slate-400 uppercase font-medium'>Signed By</div>
                  <div className='text-sm font-semibold text-slate-900'>
                    {crossMatch.signed_by_employee?.fname ? `${crossMatch.signed_by_employee.fname} ${crossMatch.signed_by_employee.lname}` : 'Awaiting Signature'}
                  </div>
                 {crossMatch.signed_by_employee && <div className='text-[10px] text-slate-500'>Employee ID: {crossMatch.signed_by_employee.id }</div>}
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <Calendar className='w-5 h-5 text-slate-300 mt-0.5' />
                <div className='space-y-0.5'>
                  <div className='text-xs text-slate-400 uppercase font-medium'>Signed At</div>
                  <div className='text-sm font-semibold text-slate-900'>
                    {crossMatch.signed_at ? format(new Date(crossMatch.signed_at), 'PPPp') : 'N/A'}
                  </div>
                </div>
              </div>

              {!crossMatch.signed_at ? (
                <div className='pt-2 space-y-4'>
                  <p className='text-[10px] text-slate-400 text-center italic'>
                    This record requires authorized validation before it can be used for transfusion.
                  </p>
                  
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger>
                      <Button className='w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 shadow-md flex items-center gap-2 font-bold'>
                        <PenTool className='w-4 h-4' />
                        Sign Report
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-md rounded-2xl'>
                      <DialogHeader>
                        <DialogTitle>Authorize Cross-Match</DialogTitle>
                        <DialogDescription>
                          Enter your unique signature code to approve this compatibility report.
                        </DialogDescription>
                      </DialogHeader>
                      <div className='py-4'>
                        <div className='text-xs text-red-500 mb-2'>
                          Warning: This action is irreversible. Please double-check the information before proceeding.
                        </div>
                        <label className='text-sm font-medium mb-1.5 block'>Signature Code</label>
                        <Input 
                          placeholder='Enter your secret code' 
                          type='password'
                          value={signatureCode}
                          onChange={(e) => setSignatureCode(e.target.value)}
                          className='rounded-xl'
                        />
                      </div>
                      <DialogFooter>
                        <Button 
                          variant='ghost' 
                          onClick={() => setIsDialogOpen(false)}
                          className='rounded-xl'
                        >
                          Cancel
                        </Button>
                        <Button 
                          className='bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 font-bold'
                          onClick={handleSign}
                          disabled={isSigning || !signatureCode}
                        >
                          {isSigning ? <Loader2 className='w-4 h-4 animate-spin mr-2' /> : 'Confirm Approval'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <div className='pt-4 pb-2'>
                   <div className='bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center justify-center gap-2 text-emerald-700 font-bold text-sm'>
                      <CheckCircle2 className='w-5 h-5' />
                      Report Validated
                   </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
