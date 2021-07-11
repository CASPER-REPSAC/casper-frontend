import React, { Component } from "react";
import { InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { rank_dummy } from "./rank_dummy";

export default class Rank extends Component {
  render() {
    return (
      <div className="rank">
        <div className="rank__board">
          <div className="title">
            <span>Rank</span>
          </div>
          <div className="rank-box">
            <div className="rank-card">
              <span className="rank-card__title">Activist</span>
              <div className="rank-card__img">
                <p>
                  1st {rank_dummy.ranks[0].activist.first_user} (
                  {rank_dummy.ranks[0].activist.first_point})
                </p>
                <p>
                  2nd {rank_dummy.ranks[0].activist.second_user} (
                  {rank_dummy.ranks[0].activist.second_point})
                </p>
                <p>
                  3rd {rank_dummy.ranks[0].activist.third_user} (
                  {rank_dummy.ranks[0].activist.third_point})
                </p>
              </div>
            </div>
            <div className="rank-card">
              <span className="rank-card__title">Observer</span>
              <div className="rank-card__img">
                <p>
                  1st {rank_dummy.ranks[0].observer.first_user} (
                  {rank_dummy.ranks[0].observer.first_point})
                </p>
                <p>
                  2nd {rank_dummy.ranks[0].observer.second_user} (
                  {rank_dummy.ranks[0].observer.second_point})
                </p>
                <p>
                  3rd {rank_dummy.ranks[0].observer.third_user} (
                  {rank_dummy.ranks[0].observer.third_point})
                </p>
              </div>
            </div>
            <div className="rank-card">
              <span className="rank-card__title">Rescuer</span>
              <div className="rank-card__img">
                <p>
                  1st {rank_dummy.ranks[0].rescuer.first_user} (
                  {rank_dummy.ranks[0].rescuer.first_point})
                </p>
                <p>
                  2nd {rank_dummy.ranks[0].rescuer.second_user} (
                  {rank_dummy.ranks[0].rescuer.second_point})
                </p>
                <p>
                  3rd {rank_dummy.ranks[0].rescuer.third_user} (
                  {rank_dummy.ranks[0].rescuer.third_point})
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rank__my">
          <div className="word-my">
            <span>M</span>
            <span>Y</span>
          </div>
          <div className="settings">
            <div className="setting">
              <div className="setting__title">
                <span>Feed</span>
              </div>
              <div className="setting__field">
                <input type="checkbox" className="checkbox" />
                <div className="label">
                  <span>Observer</span>
                </div>
              </div>
              <div className="setting__field">
                <input type="checkbox" className="checkbox" />
                <div className="label">
                  <span>Rescuer</span>
                </div>
              </div>
            </div>
            <div className="setting">
              <div className="setting__title">
                <span>Hide</span>
              </div>
              <div className="setting__field">
                <input type="checkbox" className="checkbox" />
                <div className="label">
                  <span>Observer</span>
                </div>
              </div>
              <div className="setting__field">
                <input type="checkbox" className="checkbox" />
                <div className="label">
                  <span>Rescuer</span>
                </div>
              </div>
            </div>
          </div>
          <div className="points">
            <div className="points__title">user_nickname</div>
            <div className="points__point">
              <span>Acitivist: {rank_dummy.mypoint.activist} point</span>
              <span>Observer: {rank_dummy.mypoint.observer} point</span>
              <span>Rescuer: {rank_dummy.mypoint.rescuer} point</span>
            </div>
          </div>
        </div>

        {/* <div className="my-rank border d-flex flex-row">
          <div className="my-rank__settings border">
            <div className="my-rank__settings__feed d-flex flex-row">
              Feed
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      ? Observer Feed <br />
                      If you check this option, you will receive a feed on the
                      activities (not s.o.s)
                    </Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <InputGroup.Text {...triggerHandler} ref={ref}>
                      Observer
                    </InputGroup.Text>
                  )}
                </OverlayTrigger>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      ? Rescuer Feed <br />
                      If you check this option, you will receive s.o.s feed
                    </Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <InputGroup.Text {...triggerHandler} ref={ref}>
                      Rescuer
                    </InputGroup.Text>
                  )}
                </OverlayTrigger>
              </InputGroup>
            </div>
            <div className="my-rank__settings__visible d-flex flex-row">
              Hide
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      ? Observer Hide
                      <br />
                      If you check this option, you will not be exposed to
                      ranking of observer, etc.
                    </Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <InputGroup.Text {...triggerHandler} ref={ref}>
                      Observer
                    </InputGroup.Text>
                  )}
                </OverlayTrigger>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      ? Rescuer Hide
                      <br />
                      If you check this option, you will not be exposed to
                      ranking of rescuer, etc.
                    </Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <InputGroup.Text {...triggerHandler} ref={ref}>
                      Rescuer
                    </InputGroup.Text>
                  )}
                </OverlayTrigger>
              </InputGroup>
            </div>
          </div>
          <div className="my-rank__point">
            USER_NAME
            <p>Acitivist: {rank_dummy.mypoint.activist}</p>
            <p>Observer: {rank_dummy.mypoint.observer}</p>
            <p>Rescuer: {rank_dummy.mypoint.rescuer}</p>
          </div>
        </div> */}

        <div className="analytics">
          <div className="analytics__graph"></div>
        </div>
      </div>
    );
  }
}
