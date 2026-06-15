import { Container } from '@/components/ui/container';

const sk = 'animate-pulse rounded bg-slate-200/80 dark:bg-white/10';

export default function Loading() {
  return (
    <div className="bg-[#f5f9fc] dark:bg-[#0b1120]">
      <section className="bg-gradient-to-b from-white via-[#eef6fa] to-[#f5f9fc] dark:from-[#0b1120] dark:to-[#0b1120]">
        <Container className="max-w-[1700px] py-16 text-center sm:py-20 lg:px-12">
          <div className={`mx-auto h-6 w-28 rounded-full ${sk}`} />
          <div className={`mx-auto mt-5 h-9 w-2/3 ${sk}`} />
          <div className={`mx-auto mt-4 h-4 w-1/2 ${sk}`} />
        </Container>
      </section>
      <section className="pb-24">
        <Container className="max-w-[1700px] lg:px-12">
          <div className={`mx-auto mb-8 h-12 w-full max-w-md rounded-full ${sk}`} />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white dark:border-white/10 dark:bg-white/[0.04]">
                <div className={`aspect-[16/10] ${sk} rounded-none`} />
                <div className="space-y-3 p-5">
                  <div className={`h-3 w-20 rounded-full ${sk}`} />
                  <div className={`h-5 w-full ${sk}`} />
                  <div className={`h-4 w-5/6 ${sk}`} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
