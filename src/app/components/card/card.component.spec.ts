import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from 'rxjs';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    mockPokemonService = jasmine.createSpyObj('PokemonService', ['getPokemon']);
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      imports: [HttpClientModule],
      providers: [{ provide: PokemonService, useValue: mockPokemonService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set imgUrl and types on ngOnInit', () => {
    const mockPokemon = { id: 1, sprites: { front_default: 'url' }, types: ['grass', 'poison'] };
    mockPokemonService.getPokemon.and.returnValue(of(mockPokemon));

    component.pokemon = { id: 1 } as any; // provide a dummy Pokemon object

    component.ngOnInit();

    expect(component.imgUrl).toEqual('url');
    expect(component.types).toEqual(['grass', 'poison']);
    expect(mockPokemonService.getPokemon).toHaveBeenCalledWith(1);
  });
});
