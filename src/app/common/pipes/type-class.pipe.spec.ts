import { TypeClassPipe } from './type-class.pipe';

describe('TypeClassPipe', () => {
  let pipe: TypeClassPipe;

  beforeEach(() => {
    pipe = new TypeClassPipe();
  });

  it('compiles', () => {
    const pipe = new TypeClassPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns correct classes for normal type', () => {
    expect(pipe.transform('normal')).toBe('bg-neutral-50 text-neutral-600 ring-neutral-500/10');
  });

  it('returns correct classes for fire type', () => {
    expect(pipe.transform('fire')).toBe('bg-orange-50 text-orange-700 ring-orange-700/10');
  });

  it('returns correct classes for water type', () => {
    expect(pipe.transform('water')).toBe('bg-blue-50 text-blue-700 ring-blue-700/10');
  });

  it('returns correct classes for electric type', () => {
    expect(pipe.transform('electric')).toBe('bg-yellow-50 text-yellow-800 ring-yellow-600/20');
  });

  it('returns correct classes for grass type', () => {
    expect(pipe.transform('grass')).toBe('bg-green-50 text-green-700 ring-green-600/20');
  });

  it('returns correct classes for ice type', () => {
    expect(pipe.transform('ice')).toBe('bg-cyan-50 text-cyan-700 ring-cyan-700/10');
  });

  it('returns correct classes for fighting type', () => {
    expect(pipe.transform('fighting')).toBe('bg-red-50 text-red-700 ring-red-600/10');
  });

  it('returns correct classes for poison type', () => {
    expect(pipe.transform('poison')).toBe('bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-700/10');
  });

  it('returns correct classes for ground type', () => {
    expect(pipe.transform('ground')).toBe('bg-amber-50 text-amber-700 ring-amber-800/10');
  });

  it('returns correct classes for flying type', () => {
    expect(pipe.transform('flying')).toBe('bg-sky-50 text-sky-700 ring-sky-700/10');
  });

  it('returns correct classes for psychic type', () => {
    expect(pipe.transform('psychic')).toBe('bg-pink-50 text-pink-700 ring-pink-700/10');
  });

  it('returns correct classes for bug type', () => {
    expect(pipe.transform('bug')).toBe('bg-lime-50 text-lime-700 ring-lime-600/20');
  });

  it('returns correct classes for rock type', () => {
    expect(pipe.transform('rock')).toBe('bg-stone-50 text-stone-600 ring-stone-500/10');
  });

  it('returns correct classes for ghost type', () => {
    expect(pipe.transform('ghost')).toBe('bg-purple-50 text-purple-700 ring-purple-700/10');
  });

  it('returns correct classes for dragon type', () => {
    expect(pipe.transform('dragon')).toBe('bg-indigo-50 text-indigo-700 ring-indigo-700/10');
  });

  it('returns correct classes for dark type', () => {
    expect(pipe.transform('dark')).toBe('bg-zinc-50 text-zinc-700 ring-zinc-700/10');
  });

  it('returns correct classes for steel type', () => {
    expect(pipe.transform('steel')).toBe('bg-gray-50 text-gray-600 ring-gray-500/10');
  });

  it('returns correct classes for fairy type', () => {
    expect(pipe.transform('fairy')).toBe('bg-rose-50 text-rose-700 ring-rose-700/10');
  });

  it('returns empty string for unknown type', () => {
    expect(pipe.transform('unknown')).toBe('');
  });
});
