import { TestBed } from '@angular/core/testing';
import { lorem } from 'faker';

import { ApiUtilsService } from './api-utils.service';

describe('ApiUtilsService', () => {
  let service: ApiUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should rewrite object properties from snake to camel case', () => {
    const object = {
      property_one: lorem.word(),
      property_two: lorem.word(),
    }

    const rewritedObject = service.rewriteProperties(object);
    expect(rewritedObject).toHaveProperty('propertyOne')
    expect(rewritedObject).toHaveProperty('propertyTwo')
  })
});
