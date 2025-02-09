import React from 'react'
import Head from 'next/head'
import GatewayStatus from '@/components/Gateway'
import PipelineGraph from '@/components/PipelineGraph'
import PipelineDashedChart from '@/components/PipelineDashedChart'
import Dashboard from '@/components/Panel'
import Nav from '@/components/NavBar'


function Home() {
  return (
    <>
      <Head>
        <title>MicroLeak | Home</title>
      </Head>
      <Nav/>
      <div className='p-2'>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[180px_1fr] lg:gap-8">
          <div className=" rounded-lg">
            <GatewayStatus />
          </div>
          <div className=" rounded-lg">
            <div className=" rounded-lg">
              <PipelineGraph />
            </div>
            <div className="mt-2 rounded-lg">
         <Dashboard/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
