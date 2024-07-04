import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeClass',
  standalone: true,
  pure: true
})
export class TypeClassPipe implements PipeTransform {
  private typeClasses: { [key: string]: string } = {
    normal: 'bg-neutral-50 text-neutral-600 ring-neutral-500/10',
    fire: 'bg-orange-50 text-orange-700 ring-orange-700/10',
    water: 'bg-blue-50 text-blue-700 ring-blue-700/10',
    electric: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
    grass: 'bg-green-50 text-green-700 ring-green-600/20',
    ice: 'bg-cyan-50 text-cyan-700 ring-cyan-700/10',
    fighting: 'bg-red-50 text-red-700 ring-red-600/10',
    poison: 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-700/10',
    ground: 'bg-amber-50 text-amber-700 ring-amber-800/10',
    flying: 'bg-sky-50 text-sky-700 ring-sky-700/10',
    psychic: 'bg-pink-50 text-pink-700 ring-pink-700/10',
    bug: 'bg-lime-50 text-lime-700 ring-lime-600/20',
    rock: 'bg-stone-50 text-stone-600 ring-stone-500/10',
    ghost: 'bg-purple-50 text-purple-700 ring-purple-700/10',
    dragon: 'bg-indigo-50 text-indigo-700 ring-indigo-700/10',
    dark: 'bg-zinc-50 text-zinc-700 ring-zinc-700/10',
    steel: 'bg-gray-50 text-gray-600 ring-gray-500/10',
    fairy: 'bg-rose-50 text-rose-700 ring-rose-700/10',
  };

  transform(typeName: string): string {
    return this.typeClasses[typeName] || '';
  }
}
