import { TestBed } from '@angular/core/testing';

import { ModulesGuard } from './modules.guard';

describe('ModulesGuard', () => {
  let guard: ModulesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ModulesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
