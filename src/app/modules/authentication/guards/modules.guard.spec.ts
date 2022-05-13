import { TestBed } from '@angular/core/testing';
import { ModulesGuard } from './modules.guard';


/**
 * function describes the suite of test cases enumerated by the "it" function.
 */
describe('ModulesGuard', () => {
  let guard: ModulesGuard;
  // Fetching dependencies
  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ModulesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
