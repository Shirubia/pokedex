import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeClass',
  standalone: true,
  pure: true,
})
export class TypeClassPipe implements PipeTransform {
  private typeClasses: Record<string, string> = {
    normal:
      'bg-neutral-50 text-neutral-600 ring-neutral-500/10 dark:bg-neutral-800 dark:text-neutral-300 dark:ring-neutral-400/10',
    fire: 'bg-orange-50 text-orange-700 ring-orange-700/10 dark:bg-orange-900 dark:text-orange-300 dark:ring-orange-500/10',
    water:
      'bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-900 dark:text-blue-300 dark:ring-blue-500/10',
    electric:
      'bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-900 dark:text-yellow-300 dark:ring-yellow-500/10',
    grass:
      'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900 dark:text-green-200 dark:ring-green-400/10',
    ice: 'bg-cyan-50 text-cyan-700 ring-cyan-700/10 dark:bg-cyan-900 dark:text-cyan-300 dark:ring-cyan-500/10',
    fighting:
      'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-900 dark:text-red-200 dark:ring-red-500/10',
    poison:
      'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-700/10 dark:bg-fuchsia-900 dark:text-fuchsia-300 dark:ring-fuchsia-500/10',
    ground:
      'bg-amber-50 text-amber-700 ring-amber-800/10 dark:bg-amber-900 dark:text-amber-300 dark:ring-amber-600/10',
    flying:
      'bg-sky-50 text-sky-700 ring-sky-700/10 dark:bg-sky-900 dark:text-sky-300 dark:ring-sky-500/10',
    psychic:
      'bg-pink-50 text-pink-700 ring-pink-700/10 dark:bg-pink-900 dark:text-pink-200 dark:ring-pink-500/10',
    bug: 'bg-lime-50 text-lime-700 ring-lime-600/20 dark:bg-lime-900 dark:text-lime-300 dark:ring-lime-500/10',
    rock: 'bg-stone-50 text-stone-600 ring-stone-500/10 dark:bg-stone-800 dark:text-stone-300 dark:ring-stone-600/10',
    ghost:
      'bg-purple-50 text-purple-700 ring-purple-700/10 dark:bg-purple-900 dark:text-purple-300 dark:ring-purple-500/10',
    dragon:
      'bg-indigo-50 text-indigo-700 ring-indigo-700/10 dark:bg-indigo-900 dark:text-indigo-300 dark:ring-indigo-500/10',
    dark: 'bg-zinc-50 text-zinc-700 ring-zinc-700/10 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-400/10',
    steel:
      'bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-400/10',
    fairy:
      'bg-rose-50 text-rose-700 ring-rose-700/10 dark:bg-rose-900 dark:text-rose-200 dark:ring-rose-500/10',
  };

  transform(typeName: string): string {
    return this.typeClasses[typeName] || '';
  }
}
