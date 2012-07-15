package net.xelnaga.radiate.status;

import hudson.model.Cause;
import hudson.model.Job;
import hudson.model.Result;
import hudson.scm.ChangeLogSet;

import java.util.ArrayList;
import java.util.List;

class UnbuiltStatus extends Status {

    public UnbuiltStatus(Job job) {
        super(job);
    }

    @Override
    public List<Cause> getCauses() {
        return new ArrayList<Cause>();
    }

    @Override
    public int getBuildNumber() {
        return 0;
    }

    @Override
    public long getTimestamp() {
        return 0;
    }

    @Override
    public long getDuration() {
        return 0;
    }

    @Override
    public long getEstimate() {
        return 0;
    }

    @Override
    public Result getResult() {
        return Result.NOT_BUILT;
    }

    @Override
    public State getState() {
        
        if (!job.isBuildable()) {
            return State.Disabled;
        }

        return State.NotBuilt;
    }

    @Override
    public Iterable<ChangeLogSet.Entry> getChanges() {
        return new ArrayList<ChangeLogSet.Entry>();
    }

    @Override
    public int getHealth() {
        return 0;
    }
}
