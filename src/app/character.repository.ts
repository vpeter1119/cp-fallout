import { createStore, withProps } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Character {
  id: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CharacterProps {
}

export const store = createStore({ name: 'character' }, withProps<CharacterProps>({}), withEntities<Character>());

export const character$ = store.pipe(selectAllEntities());

export function setCharacter(character: Character[]) {
  store.update(setEntities(character));
}

export function addCharacter(character: Character) {
  store.update(addEntities(character));
}

export function updateCharacter(id: Character['id'], character: Partial<Character>) {
  store.update(updateEntities(id, character));
}

export function deleteCharacter(id: Character['id']) {
  store.update(deleteEntities(id));
}
