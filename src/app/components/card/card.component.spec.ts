import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { PokemonService } from '../../shared/services/pokemon.service';
import { Pokemon, PokemonTypeName } from '../../shared/models/pokemon.model';
import { TypeClassPipe } from '../../shared/pipes/type-class.pipe';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let mockPokemonService: jest.Mocked<PokemonService>;

  const mockPokemon: Pokemon = {
    id: 131,
    name: 'lapras',
    url: 'https://pokeapi.co/api/v2/pokemon/131/',
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png',
    },
    types: [
      { type: { name: PokemonTypeName.Water } },
      { type: { name: PokemonTypeName.Ice } },
    ],
  };

  beforeEach(async () => {
    mockPokemonService = {
      getPokemon: jest.fn(),
    } as unknown as jest.Mocked<PokemonService>;
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [HttpClientModule, TypeClassPipe],
      providers: [{ provide: PokemonService, useValue: mockPokemonService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('should fetch Pokémon details if ID is present', () => {
      component.pokemon = { id: 131, name: 'lapras', url: '' };
      mockPokemonService.getPokemon.mockReturnValue(of(mockPokemon));

      fixture.detectChanges();

      expect(mockPokemonService.getPokemon).toHaveBeenCalledWith(131);
      expect(component.pokemon.sprites).toEqual(mockPokemon.sprites);
      expect(component.pokemon.types).toEqual(mockPokemon.types);
    });

    it('should log an error if Pokémon ID is missing', () => {
      console.error = jest.fn();
      component.pokemon = { name: 'lapras', url: '' } as unknown as Pokemon;

      fixture.detectChanges();

      expect(mockPokemonService.getPokemon).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Pokémon ID is missing!');
    });

    it('should handle errors from the service', () => {
      console.error = jest.fn();
      component.pokemon = { id: 131, name: 'lapras', url: '' };
      mockPokemonService.getPokemon.mockReturnValue(
        throwError(() => new Error('Service error')),
      );

      fixture.detectChanges();

      expect(mockPokemonService.getPokemon).toHaveBeenCalledWith(131);
      expect(console.error).toHaveBeenCalledWith(
        'Failed to fetch Pokémon data:',
        new Error('Service error'),
      );
    });
  });

  describe('Data assignment', () => {
    it('should merge sprites correctly', () => {
      component.pokemon = {
        id: 131,
        name: 'lapras',
        url: '',
        sprites: { front_default: 'existing-url' },
      };
      mockPokemonService.getPokemon.mockReturnValue(of(mockPokemon));

      fixture.detectChanges();

      expect(component.pokemon.sprites).toEqual({
        front_default: mockPokemon.sprites!.front_default,
      });
    });

    it('should update types correctly', () => {
      component.pokemon = { id: 131, name: 'lapras', url: '', types: [] };
      mockPokemonService.getPokemon.mockReturnValue(of(mockPokemon));

      fixture.detectChanges();

      expect(component.pokemon.types).toEqual(mockPokemon.types);
    });
  });
});
