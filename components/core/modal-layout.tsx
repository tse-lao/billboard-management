"use client"
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

export default function ModalLayout({ title, children, showModal}: { title: string, children: any, showModal: boolean }) {
  const [open, setOpen] = useState(true)
  const HYPERSPACE_ID = 3141;
  const POLYGON = 80001;
  const {chain} = useNetwork();
  const {switchNetwork} = useSwitchNetwork();

  useEffect(() => {
    if(showModal) setOpen(showModal)
  }, [showModal])
  
  const changeOverlay = (e:any) => {
    setOpen(e)

    
    if (chain?.id != POLYGON ){
      switchNetwork?.(POLYGON)
    }
    
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={changeOverlay}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-50 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-600 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <h2 className='text-xl font-bold mb-4'>{title}</h2>
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block ">
              <button
                type="button"
                className="rounded-md bg-gray-600 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => changeOverlay(false)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>  
              <div className=''>
                {children}
              
              </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}